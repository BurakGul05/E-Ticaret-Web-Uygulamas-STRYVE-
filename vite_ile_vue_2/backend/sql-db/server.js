require("dotenv").config();//env dosyamizi import ettik
const express = require("express");
const cors = require("cors");
const { validateEmail, validateName, validateSurname, validateTel } = require("../validation");
const app = express();
app.use(cors());
const db = require("./db");//db .js dosyamizi import ettik
app.use(express.json());



//* BU KISIM SQL ILE BAGLANTIYI SAGLAYAN EN SON BULUNMASI GEREKEN BACKEND SORGULARI. YANI BURADA MYSQL ILE ADMIN PRODUCT.VUE SAYFAM BAGLANTILI OLDU

//!? ADMIN PRODUCTS KISMI
//! PRODUCTS LISTELE -GET- sql sorgu Select
app.get("/api/products", async (req, res) => {
      try {
            const [rows] = await db.query("SELECT * FROM products ORDER BY p_id ASC");
            res.status(200).json(rows);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
});
//!   PRODUCTS EKLE -POST-  sql sorgu insert into
app.post("/api/products", async (req, res) => {
      try {
            const { name, stock, price, desc } = req.body;
            if (!name || !stock || !price || !desc) return res.status(400).json({ error: "hatali veri geldi" });
            const [result] = await db.query(

                  "INSERT INTO products (p_name,p_desc,p_stock,p_price,p_disc,p_active) VALUES (?,?,?,?,?,?)",
                  [name.trim(), desc.trim(), stock, price, price, 1]
            );
            res.status(201).json(name + "  " + " adli urun eklendi ");
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
});
//! PRODUCTS GÜNCELLE -PUT- sql sorgu update set yapisi
app.put("/api/products/:id", async (req, res) => {
      try {
            const id = Number(req.params.id);
            const { name, stock, price, desc } = req.body;

            if (isNaN(id)) return res.status(400).json({ error: "Geçersiz ID" });
            if (!name || !stock || !price || !desc) return res.status(400).json({ error: "hatali veri geldi" });

            const [result] = await db.query(
                  "UPDATE products SET p_name=?,p_stock=?,p_price=?,p_desc=? WHERE p_id=?",
                  [name.trim(), stock, price, desc, id]
            );


            // if (result.affectedRows === 0) {
            //       return res.status(404).json({ error: "Güncellenecek urun  bulunamadı." });
            // }
            //const [rows] = await db.query("SELECT * FROM products WHERE p_id=?", [id]);


            res.status(200).json(rows[0].p_name + "adli urun guncellendi");
      }
      catch (err) {
            res.status(500).json({ error: "Sunucu hatası" });
      }
});
//! PRODUCTS SİL-DELETE- sql sorgu: delete 
app.delete("/api/products/:id", async (req, res) => {
      try {
            const id = Number(req.params.id);
            const [result] = await db.query("DELETE FROM products WHERE p_id=?", [id]);
            res.status(200).json("Urun silindi");

      } catch (err) {
            res.status(500).json({ error: err.message });
      }
});



//!? ADMIN  MESSAGES KISMI
//!     MESSAGES LISTELE -GET- SQL sorgu Select
app.get("/api/messages", async (req, res) => {
      try {
            const [rows] = await db.query("SELECT * FROM messages ORDER BY m_id ASC");
            res.status(200).json(rows);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
});
//! MESSAGES GÜNCELLE-put sql sorgu: update set yapisi
app.put("/api/messages/:id", async (req, res) => {
      try {
            const id = Number(req.params.id);
            const { status } = req.body;

            if (isNaN(id)) return res.status(400).json({ error: "Geçersiz ID" });
            if (!status) return res.status(400).json({ error: "hatali veri geldi" });

            const [result] = await db.query(
                  "UPDATE messages SET m_status=?  WHERE m_id=?",
                  [status, id]
            );

            res.status(200).json(" mesaj durumu guncellendi");
      } catch (err) {
            res.status(500).json({ error: "Sunucu hatası" });
      }
});
//! MESSAGES SİL-delete sql sorgu: delete 
app.delete("/api/messages/:id", async (req, res) => {
      try {
            const id = Number(req.params.id);
            const [result] = await db.query("DELETE FROM messages WHERE m_id=?", [id]);
            res.status(200).json("Mesaj silindi");

      } catch (err) {
            res.status(500).json({ error: err.message });
      }
});







//!? ADMIN  USERS KISMI
//!     USERS LISTELE -GET- SQL sorgu Select
app.get("/api/users", async (req, res) => {
      try {
            const [rows] = await db.query("SELECT * FROM users ORDER BY u_id ASC");
            res.status(200).json(rows);
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
});
//!   USERS EKLE -POST- SQl insert into
app.post("/api/users", async (req, res) => {
      try {
            const { firstName, lastName, email, phone, pass, birthdate, role } = req.body;
            if (!firstName || !lastName || !email || !phone || !pass || !birthdate) return res.status(400).json({ error: "hatali veri geldi" });
            const [result] = await db.query(

                  "INSERT INTO users (u_firstName,u_lastName,u_email,u_phone,u_pass,u_birthdate,u_role) VALUES (?,?,?,?,?,?,?)",
                  [firstName.trim(), lastName.trim(), email.trim(), phone, pass, birthdate, role]
            );
            res.status(201).json(firstName + "  " + lastName + " Adli Kullanici Eklendi ");
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
});
//! USERS GÜNCELLE-put sql sorgu: update set yapisi
app.put("/api/users/:id", async (req, res) => {
      try {
            const id = Number(req.params.id);
            const { firstName, lastName, email, phone, pass, role } = req.body;

            if (isNaN(id)) return res.status(400).json({ error: "Geçersiz ID" });
            if (!firstName || !lastName || !email || !phone || !pass) return res.status(400).json({ error: "hatali veri geldi" });

            const [result] = await db.query(
                  "UPDATE users SET u_firstName=?,u_lastName=?,u_email=?,u_phone=?,u_pass=?,u_role=?  WHERE u_id=?",
                  [firstName.trim(), lastName.trim(), email.trim(), phone, pass, role, id]
            );


            // if (result.affectedRows === 0) {
            //       return res.status(404).json({ error: "Güncellenecek urun  bulunamadı." });
            // }
            // const [rows] = await db.query("SELECT * FROM products WHERE p_id=?", [id]);


            res.status(200).json("Kisi Bilgisi Guncellendi");
      } catch (err) {
            res.status(500).json({ error: "Sunucu hatası" });
      }
});
//! MESSAGES SİL-delete sql sorgu: delete 
app.delete("/api/users/:id", async (req, res) => {
      try {
            const id = Number(req.params.id);
            const [result] = await db.query("DELETE FROM users WHERE u_id=?", [id]);
            res.status(200).json({ message: "Kullanici silindi" });

      } catch (err) {
            res.status(500).json({ error: err.message });
      }
});




//!? ADMIN  ORDERS KISMI
//!     ORDERS LISTELE -GET- SQL sorgu Select
app.get("/api/orders", async (req, res) => {
      try {
            const [rows] = await db.query("SELECT * FROM orders ORDER BY o_id DESC");
            res.status(200).json(rows);
      } catch (err) {
            res.status(500).json({ error: err.message });
      } const name = new type(arguments);
});
//!   ORDERS EKLE -POST- SQl insert into
app.post("/api/orders", async (req, res) => {
      try {
            const { o_no, o_products, o_pids, o_person, o_address, o_amount, o_status } = req.body;
            if (!o_no || !o_products || !o_pids || !o_person || !o_address || !o_amount || !o_status) return res.status(400).json({ error: "hatali veri geldi" });
            const [result] = await db.query(

                  "INSERT INTO orders (o_no,o_products,o_pids,o_person,o_address,o_amount, o_status) VALUES (?,?,?,?,?,?,?)",
                  [o_no.trim(), o_products.trim(), o_pids, o_person, o_address, o_amount, o_status]
            );
            res.status(201).json(o_no + "  " + " Urun Eklendi ");
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
});
//! ORDERS GÜNCELLE-put sql sorgu: update set yapisi
app.put("/api/orders/:id", async (req, res) => {
      try {
            const id = Number(req.params.id);
            const { status } = req.body;

            if (isNaN(id)) return res.status(400).json({ error: "Geçersiz ID" });
            if (!status) return res.status(400).json({ error: "hatali veri geldi" });

            const [result] = await db.query(
                  "UPDATE orders SET o_status=? WHERE o_id=?",
                  [status, id]
            );


            // if (result.affectedRows === 0) {
            //       return res.status(404).json({ error: "Güncellenecek urun  bulunamadı." });
            // }
            // const [rows] = await db.query("SELECT * FROM products WHERE p_id=?", [id]);


            res.status(200).json("Siparis Guncellendi");
      } catch (err) {
            res.status(500).json({ error: "Sunucu hatası" });
      }
});
//! ORDERS SİL-delete sql sorgu: delete 
app.delete("/api/orders/:id", async (req, res) => {
      try {
            const id = Number(req.params.id);
            const [result] = await db.query("DELETE FROM orders WHERE o_id=?", [id]);
            res.status(200).json({ message: "Urun silindi" });

      } catch (err) {
            res.status(500).json({ error: err.message });
      }
});





//!-----------------------------------------------------------------------------------------------------------------


//?CONTACT MESSAGE -POST- SQL SORGUSU INSERT INTO
//! CONTACT - MESAJ EKLE - POST - SQL SORGU INSERT INTO
app.post("/api/contact", async (req, res) => {
      try {
            const { firstName, lastName, email, phone, subject, message } = req.body;
            if (!firstName || !lastName || !email || !phone || !subject || !message) return res.status(400).json({ error: "hatali veri geldi" });
            const [result] = await db.query(

                  "INSERT INTO messages (m_firstName,m_lastName,m_email,m_phone,m_subject,m_message,m_status) VALUES (?,?,?,?,?,?,?)",
                  [firstName.trim(), lastName.trim(), email.trim(), phone, subject, message.trim(), 0]
            );
            res.status(201).json(" Mesaj Gonderildi ");
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
});

















//?REGISTER -POST- SQL SORGUSU: INSERT INTO
//! REGISTER - KULLANICI KAYIT - POST - SQL SORGU INSERT INTO
app.post("/api/register", async (req, res) => {
      try {
            const { firstName, lastName, email, phone, pass, birthdate } = req.body;
            if (!firstName || !lastName || !email || !pass || !phone || !birthdate) return res.status(400).json({ error: "hatali veri geldi" });
            const [result] = await db.query(

                  "INSERT INTO users (u_firstName,u_lastName,u_email,u_phone,u_pass,u_birthdate,u_role) VALUES (?,?,?,?,?,?,?)",
                  [firstName.trim(), lastName.trim(), email.trim(), phone, pass, birthdate, 0]
            );
            res.status(201).json(" Kayit Basarili ");
      } catch (err) {
            res.status(500).json({ error: err.message });
      }
});



//?LOGIN -GET- SQL SORGUSU: SELECT 
app.post("/api/login", async (req, res) => {
      const { email, pass } = req.body;

      try {
            const [rows] = await db.query("SELECT u_id, u_role, u_firstName FROM users WHERE u_email=? AND u_pass=?", [email, pass]);
            if (rows[0].u_id) {
                  return res.status(200).json(rows);
            }
            else {
                  return res.status(404).json({ error: "Giriş Başarısız" })
            }
      } catch (err) {
            res.status(500).json({ error: err.message });
      } const name = new type(arguments);
});






//? ADMINPAGE- USERNAME
app.post("/api/getUsername", async (req, res) => {
      const { id } = req.body;

      try {
            const [rows] = await db.query("SELECT  u_firstName FROM users WHERE u_id=?", [id]);
            if (rows) {
                  return res.status(200).json(rows[0].u_firstName);
            }
            else {
                  return res.status(404).json({ error: "Kullanici Bulunamadi" })
            }
      } catch (err) {
            res.status(500).json({ error: err.message });
      } const name = new type(arguments);
});







//? CHECKOUT -POST- SQL SORGUSU: INSERT INTO




























const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Backend:http://localhost:${PORT}`));
