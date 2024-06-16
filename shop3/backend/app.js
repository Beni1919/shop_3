import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'
import session from 'express-session'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const store = new session.MemoryStore()
const cart = []


dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

// Server port:

app.listen(8800, ()=>{
    console.log('connected to server.')
})

//Session használata:

app.use(session({
    secret: 'some secret',
    cookie: { maxAge: 1000*60*60 },
    resave: false,
    saveUninitialized: true, //jó ez így?
    rolling: true,
    store: store
}))

// Kosár műveltek + session

//Termék hozzáadása kosárhoz:
app.post('/addtocart', (req, res) => {
    if(req.session.cart !== 'undefined') {

        const productsQuery = "SELECT * FROM products WHERE product_id = '" + req.body.product + "'"
        console.log(req.body.product)
        db_connection.query(productsQuery,(err,data)=>{
        if(err) console.log(res.json(err))
        //console.log(data)

        cart.push(data[0])
        req.session.cart = cart
        //console.log(req.session)
        })
        res.send(200)
    }else{
        //req.session.cart = []
        console.log(req.body.product)
        const productsQuery = "SELECT * FROM products WHERE product_id = '" + req.body.product + "'"
        db_connection.query(productsQuery,(err,data)=>{
        if(err) console.log(res.json(err))
        console.log(data)

        cart.push(data[0])
        req.session.cart = cart
        //console.log(req.session)
        })
        res.send(200)
    }
})

// Termék eltávolítása kosárból:
app.post('/removefromcart', (req, res) => {
    cart.forEach((item)=> {
        if(item.product_id == req.body.product_cart_id) {
            //console.log(item.product_name)
            cart.splice(cart.indexOf(item),1)
        }
    })
    //console.log(cart)
    //res.sendStatus(200)
    return res.json(cart)
})

//Session kosár elemek lekérése:
app.get('/cartitems', (req, res) => {
    //console.log(cart)
    return res.json(cart)
})


//Multer rész - itt történik az illusztrációs kép feltöltése:
const FileStrorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './product_pics')
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({storage: FileStrorageEngine})

app.post('/upload', upload.single('image'), (req,res,next) => {
    res.send('a kép feltöltésre került')
})

//Static folder képeknek, megadása:

app.use('/product_pics', express.static(__dirname + '/product_pics'))

// Adatbázis csatlakozási adatok:

const db_connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "webshop_schema"
})

// Adatbázis query összes termékre és kategóriákra:

app.post("/",(req,res)=>{

    if(req.body.product_type === undefined){
        const productsQuery = "SELECT * FROM products"
        db_connection.query(productsQuery,(err,data)=>{
       if(err) return res.json(err)
       return res.json(data)
    })
    }else{
        const productsQuery = "SELECT * from products WHERE product_type = '" + req.body.product_type + "'";
        db_connection.query(productsQuery,(err,data)=>{
       if(err) return res.json(err)
       return res.json(data)
    })
    }
    
})

// Adatbázis query új termék feltöltésére:

app.post("/newproduct", (req,res)=>{
    var sql = "INSERT INTO products (product_name,product_type,product_category,product_price,active,focus,picture,description) VALUES (?)"
    var values = [
        req.body.product_name,
        req.body.product_type,
        req.body.product_category,
        req.body.product_price,
        req.body.active,
        req.body.focus,
        req.body.picture,
        req.body.description,
    ] 

    let addProductQuery = db_connection.query(sql, [values],(err,data)=>{
        console.log(addProductQuery)
        if (err) throw err
        if(err) return res.json(err)
        return res.json("The book has been added to the database succesfully")
    })
}) 

// Kategóriák lekérése categories táblából:

app.get("/categories",(req,res)=>{
    const productsQuery = "SELECT * FROM categories"
    db_connection.query(productsQuery,(err,data)=>{
       if(err) return res.json(err)
       return res.json(data)
    })
})

// Alkategóriák lekérése subcategories táblából:

app.get("/subcategories",(req,res)=>{
    const productsQuery = "SELECT * FROM subcategories"
    db_connection.query(productsQuery,(err,data)=>{
       if(err) return res.json(err)
       return res.json(data)
    })
})

// Termékek lekrése szerkesztéshez rendezéssel

app.post("/adminproducts",(req,res)=>{


    if(req.body.sorting === '' && req.body.searchWord === ''){
        const productsQuery = "SELECT * FROM products "
        db_connection.query(productsQuery,(err,data)=>{
       if(err) return res.json(err)
       return res.json(data)
    })
    }else if (req.body.sorting === '' && req.body.searchWord != ''){
        const productsQuery = "SELECT * FROM products WHERE product_name OR product_category OR product_type OR description LIKE '%" + req.body.searchWord + "%'"
        //console.log(productsQuery)
        db_connection.query(productsQuery,(err,data)=>{
       if(err) return res.json(err)
       return res.json(data)
    })
    }else if (req.body.sorting != '' && req.body.searchWord != ''){
        const productsQuery = "SELECT * FROM products WHERE product_name OR product_category OR product_type OR description LIKE '%" + req.body.searchWord + "%'ORDER BY " + req.body.sorting + ""
        console.log(productsQuery)
        db_connection.query(productsQuery,(err,data)=>{
       if(err) return res.json(err)
       return res.json(data)
    })
    }
})

// Meglévő termék módosítása, szerkesztése:
app.post("/updateproduct",(req,res)=>{
    if(req.body.picture!=''){
        const productsQuery = "UPDATE products SET product_name = '"+req.body.product_name+"',product_type = '"+req.body.product_type+"',product_category = '"+req.body.product_category+"', product_price = "+req.body.product_price+", active = "+req.body.active+", focus = "+req.body.focus+", description = '"+req.body.description+"', picture = '"+req.body.picture+"' WHERE product_id = "+req.body.id+""
        console.log(productsQuery)
        db_connection.query(productsQuery,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
        })
    }else{
        const productsQuery = "UPDATE products SET product_name = '"+req.body.product_name+"',product_type = '"+req.body.product_type+"',product_category = '"+req.body.product_category+"', product_price = "+req.body.product_price+", active = "+req.body.active+", focus = "+req.body.focus+", description = '"+req.body.description+"' WHERE product_id = "+req.body.id+""
        console.log(productsQuery) 
        db_connection.query(productsQuery,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
        })
    }
    
    
})

// Termék törlése:

app.post("/deleteproduct",(req,res)=>{
    const productsQuery = "DELETE FROM products WHERE product_id = "+req.body.id+""
    console.log(productsQuery)
    db_connection.query(productsQuery,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
    })        
})

