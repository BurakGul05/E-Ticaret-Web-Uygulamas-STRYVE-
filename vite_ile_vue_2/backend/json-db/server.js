const express = require("express");
const cors = require("cors");
const fs = require("fs"); 

const { validateEmail, validateName, validateSurname, validateTel } = require("../validation");

const app = express();
app.use(cors());
app.use(express.json());



//!  hello get endpointi
app.get("/api/hello", (req, res) => { //! /api/hello=endpointler bunlar 
      res.status(200).json({//! api helloya get istegi gelirse json formatinda asagidaki message ve time gonder 
            message: "Merhaba! Backend çalışıyor.",
            time: new Date().toISOString()
      });
});



//? ADMIN PRODUCT KISMI
//!GET products endpointi- urun listele
app.get("/api/products", (req, res) => {

      const data = fs.readFileSync("products.json", "utf-8");//!"products.json dosyasını oku, içindeki bilgileri UTF-8 formatında al ve sonucu data isimli değişkene koy."
      //! fs.readFileSync, Node.js'in File System modülü ile bir dosyayı okuyup içindeki veriyi almamızı sağlar. Sync (senkron) olduğu için dosya okuma işlemi bitene kadar bekler ve sonucu bize verir. "products.json" okunacak dosyanın adıdır, "utf-8" ise dosyanın içindeki bilgilerin normal yazı olarak okunmasını sağlayan karakter kodlama biçimidir.

      res.status(200).json(JSON.parse(data));//! Dosyadan okunan veriyi hazırlar ve kullanıcıya JSON formatında cevap olarak döndürür.


      //!PRODUCT.JSONA TASIDIGIMIZ ICIN YORUM SATIRI YAPTIK 
      //res.json([//api/products oldugu zaman resi(yani cevabi) json formatinda donustur
      // { id: 1, name: "Nike", stock: 4, price:100},
      // { id: 2, name: "Adidas", stock: 8, price:150},
      // { id: 3, name: "Hummel",stock: 3, price:175},
      // ]);
});

//!POST PRODUCTS ENDPOINTI-URUN EKLE
app.post("/api/products", (req, res) => { //!?POST → yeni veri göndermek / oluşturmak."Ben bu sunucuda yeni veri ekleme işlemi yapacağım.(app.post ile) request=istek."
      //!req (request) → Kullanıcının gönderdiği bilgiler.
      //!res (response) → Sunucunun kullanıcıya vereceği cevap.

      try {
            const { name, stock, price, description } = req.body; //!req.body içindeki name, stock ve price değerlerini alıp aynı isimde değişkenlere aktarır.

            if (!name || !stock || !price || !description) { //!Name, stock veya price alanlarından herhangi biri boş ya da geçersiz mi?
                  return res.status(400).json("Hatali Veri Geldi")//!Veri eksik veya hatalıysa istemciye hata mesajı gönderir.
            }
            else {
                  const data = JSON.parse(fs.readFileSync("products.json", "utf-8"));//!jsondaki veriyi cek

                  const newProducts = {
                        id: data.length + 1,//! Dizide kaç ürün varsa onun 1 fazlasını yeni ürünün ID'si olarak belirler

                        name: name, //!body= Request'in içindeki veri bölümü. Bir HTTP isteğinin bölümleri vardır:Request  header, body,  params,  query Body: Gönderilen asıl veri demektir. genel mantigi  gelen verinin name degerini al 

                        stock: stock, //!stock=  Oluşturduğun yeni objenin içindeki alan adıdır. req.body=  Kullanıcının API'ye gönderdiği verilerin bulunduğu bölümdür. stock Gelen verinin içindeki stock değerini alır.

                        price: price,

                        description: description,
                  };
                  data.push(newProducts);//!Cektigin diziye yeni elemani burda pushlarsin
                  //!data Mevcut ürünlerin dizisi.Oluşturulan yeni ürünü mevcut ürünler dizisinin sonuna ekler.

                  fs.writeFileSync("products.json", JSON.stringify(data, null, 2));//! Güncellenen data dizisini JSON formatına çevirip products.json dosyasının içine kaydeder
                  //! data, null, 2)= data JSON'a çevrilecek veridir, null veriyi değiştirmeden olduğu gibi çevir anlamına gelir, 2 ise çıktıyı her iç içe seviyede 2 boşluk girintileyerek daha okunabilir hale getirir.

                  res.status(201).json("Urun Basariyla Eklendi");//!status → durum kodu demektir.Sunucunun yaptığı işlemin sonucunu belirtir.
                  //!genel mantik=Oluşturulan yeni ürünü, başarılı kayıt kodu (201) ile JSON formatında istemciye geri döndürür
            }
      }
      catch (e) {
            res.status(500).json("Sunucu Hatasi")
      }
});

//?PUT GUNCELLE 
app.put("/api/products/:id", (req, res) => {
      //!Buradaki ":" şu anlama gelir=  Buraya dinamik (değişebilir) bir değer gelecek.Yani Express diyor ki"Buraya hangi sayı gelirse gelsin onu bana yakala."hangi urunun guncellenecegini bilmek gerektigi icin id ekleniyor
      //!genel mantik="/api/products/:id" adresine gelen PUT isteğinde, URL'deki id değerini alarak o ürünü güncellemek için kullanılır.

      const id = Number(req.params.id);
      //!req.params → URL'deki değişken değerleri (örneğin id) yakalamak için kullanılır.
      //!Number(req.params.id)=Request'in içindeki params özelliğinde bulunan id değerini al ve onu sayıya çevir."

      const { name, stock, price } = req.body; //!İstemcinin gönderdiği yeni name değerini req.body içinden alıp name değişkenine aktarır.
      if (!name || stock<0 || !price) //degerler bos mu? diye bakiliyor
      {
            return res.status(400).json("Hatalı veri geldi");
      }

      // 404: urun var mı?
      const products = JSON.parse(fs.readFileSync("products.json", "utf-8"));//!jsondaki veriyi cek
      const product = products.find(p => p.id === id);
      //!products.find(s => s.id === id)= products dizisindeki tüm ürünleri tek tek kontrol eder, id'si aranan id ile aynı olan ilk ürünü bulup döndürür.

      if (!product) {
            return res.status(404).json({
                  //! return işlemi yapıp fonksiyondan çıkar, res kullanıcıya cevap gönderir, status(404) bulunamadı durum kodu verir, json() cevabı JSON formatında gönderir.
                  error: "Güncellenecek urun bulunamadı."
            });
      }

      //Urunun keylerindeki degeri istekle gelen degerlere ata 
      product.name = name.trim();
      product.stock = stock;
      product.price = price;

      //guncellenen product dizisini tekrardan dosyaya yaz 
      fs.writeFileSync("products.json", JSON.stringify(products, null, 2));


      // 200: basarili
      res.status(200).json(product);
});

//!DELETE SIL
app.delete("/api/products/:id", (req, res) => {
      //!Buradaki  ":" şu anlama gelir=  Buraya dinamik (değişebilir) bir değer gelecek.Yani Express diyor ki"Buraya hangi sayı gelirse gelsin onu bana yakala."hangi urunun guncellenecegini bilmek gerektigi icin id ekleniyor
      //!genel mantik="/api/products/:id" adresine gelen PUT isteğinde, URL'deki id değerini alarak o ürünü güncellemek için kullanılır.

      const id = Number(req.params.id);
      //!req.params → URL'deki değişken değerleri (örneğin id) yakalamak için kullanılır.
      //!Number(req.params.id)=Request'in içindeki params özelliğinde bulunan id değerini al ve onu sayıya çevir."

      // 404: urun var mı?
      const products = JSON.parse(fs.readFileSync("products.json", "utf-8"));//!jsondaki veriyi cek
      const product = products.find(p => p.id === id);
      //!products.find(s => s.id === id)= products dizisindeki tüm ürünleri tek tek kontrol eder, id'si aranan id ile aynı olan ilk ürünü bulup döndürür.

      if (!product) {
            return res.status(404).json({
                  //! return işlemi yapıp fonksiyondan çıkar, res kullanıcıya cevap gönderir, status(404) bulunamadı durum kodu verir, json() cevabı JSON formatında gönderir.
                  error: "Silinecek urun bulunamadi."
            });
      }

      products.splice(products.indexOf(product), 1);

      //guncellenen product dizisini tekrardan dosyaya yaz 
      fs.writeFileSync("products.json", JSON.stringify(products, null, 2));


      // 200: basarili
      res.status(200).json(product);
});






//? ADMIN USER KISMI
//! GET USERS ENDPOINTI
app.get("/api/users", (req, res) => {

      const data = fs.readFileSync("users.json", "utf-8");//!users.json dosyasini oku idindeki bilgileri utf 8 formatinda al  ve sonucu data isimli değişkene koy."
      res.status(200).json(JSON.parse(data));//! Dosyadan okunan veriyi hazırlar ve kullanıcıya JSON formatında cevap olarak döndürür.


      //!*USERS.JSONA TASIDIGIMIZ ICIN YORUM SATIRI YAPTIK 
      // res.json([
      //   { id: 1, firstName: "Ahmet", lastName: "Cinar", email:"ahmet@example.com",tel:"1234567890",pass:"password1"},
      //  { id: 2, firstName: "Mehmet", lastName: "Kaya", email:"mehmet@example.com",tel:"0987654321",pass:"password2"},
      //    { id: 3, firstName: "Ayse", lastName: "Demir", email:"ayse@example.com",tel:"1122334455",pass:"password3"},
      //  ]);
});

//!POST USERS ENDPOINTI-KULLANICI EKLE
app.post("/api/users", (req, res) => { //!POST → yeni veri göndermek / oluşturmak."Ben bu sunucuda yeni veri ekleme işlemi yapacağım.(app.post ile) request=istek."
      try {
            const { firstName, lastName, email, tel, pass, repeatPass } = req.body //? Gelen isteğin (req) içindeki body verisinden kullanıcıya ait firstName, lastName, email, tel ve pass bilgilerini alıp ayrı değişkenler olarak kullanıma hazır hale getirir.

            if (!firstName || !lastName || !email || !tel || !pass || !repeatPass) {
                  return res.status(400).json("Hatali Veri Geldi")
            }

            // if (pass !== repeatPass) {
            //       return res.status(400).json("Parolalar eşleşmiyor");
            // }

            else {
                  const data = JSON.parse(fs.readFileSync("users.json", "utf-8"));//?jsondaki veriyi cek.Kontrolden sonra else icine aldik cunku hata varsa okumasina gerek yok

                  const newUser =
                  {
                        id: data.length + 1,//!? Dizide kaç ürün varsa onun 1 fazlasını yeni ürünün ID'si olarak belirler

                        firstName: firstName, //!?body= Request'in içindeki veri bölümü. Bir HTTP isteğinin bölümleri vardır:Request  header, body,  params,  query Body: Gönderilen asıl veri demektir. genel mantigi  gelen verinin name degerini al 

                        lastName: lastName, //!?stock=  Oluşturduğun yeni objenin içindeki alan adıdır. req.body=  Kullanıcının API'ye gönderdiği verilerin bulunduğu bölümdür. stock Gelen verinin içindeki stock değerini alır.

                        email: email,
                        tel: tel,
                        pass: pass,
                        repeatPass: repeatPass
                  };
                  data.push(newUser);//!Cektigin diziye yeni elemani burda pushlarsin

                  fs.writeFileSync("users.json", JSON.stringify(data, null, 2));//! Güncellenen data dizisini JSON formatına çevirip products.json dosyasının içine kaydeder
                  //! data, null, 2)= data JSON'a çevrilecek veridir, null veriyi değiştirmeden olduğu gibi çevir anlamına gelir, 2 ise çıktıyı her iç içe seviyede 2 boşluk girintileyerek daha okunabilir hale getirir.

                  res.status(201).json("Kullanici Basariyla Eklendi");//!status → durum kodu demektir.Sunucunun yaptığı işlemin sonucunu belirtir.
                  //!genel mantik=Oluşturulan yeni ürünü, başarılı kayıt kodu (201) ile JSON formatında istemciye geri döndürür
            }
      }
      catch (e) {

            res.status(500).json("Sunucuda Hata Oldu")
      }
});

//!DELETE SIL
app.delete("/api/users/:id", (req, res) => {
      //!Buradaki  ":" şu anlama gelir=  Buraya dinamik (değişebilir) bir değer gelecek.Yani Express diyor ki"Buraya hangi sayı gelirse gelsin onu bana yakala."hangi urunun guncellenecegini bilmek gerektigi icin id ekleniyor
      //!genel mantik="/api/products/:id" adresine gelen PUT isteğinde, URL'deki id değerini alarak o ürünü güncellemek için kullanılır.

      const id = Number(req.params.id);
      //!req.params → URL'deki değişken değerleri (örneğin id) yakalamak için kullanılır.
      //!Number(req.params.id)=Request'in içindeki params özelliğinde bulunan id değerini al ve onu sayıya çevir."

      // 404: urun var mı?
      const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));//!jsondaki veriyi cek
      const user = users.find(u => u.id === id);
      //!users.find(s => s.id === id)= users dizisindeki tüm ürünleri tek tek kontrol eder, id'si aranan id ile aynı olan ilk ürünü bulup döndürür.

      if (!user) {
            return res.status(404).json({
                  //! return işlemi yapıp fonksiyondan çıkar, res kullanıcıya cevap gönderir, status(404) bulunamadı durum kodu verir, json() cevabı JSON formatında gönderir.
                  error: "Silinecek kullanici bulunamadi."
            });
      }
      users.splice(users.indexOf(user), 1);

      //guncellenen product dizisini tekrardan dosyaya yaz 
      fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

      // 200: basarili
      res.status(200).json("Kullanici silindi");
});

//?!PUT GUNCELLE 
app.put("/api/users/:id", (req, res) => {
      //!Buradaki ":" şu anlama gelir=  Buraya dinamik (değişebilir) bir değer gelecek.Yani Express diyor ki"Buraya hangi sayı gelirse gelsin onu bana yakala."hangi urunun guncellenecegini bilmek gerektigi icin id ekleniyor
      //!genel mantik="/api/products/:id" adresine gelen PUT isteğinde, URL'deki id değerini alarak o ürünü güncellemek için kullanılır.

      const id = Number(req.params.id);
      //!req.params → URL'deki değişken değerleri (örneğin id) yakalamak için kullanılır.
      //!Number(req.params.id)=Request'in içindeki params özelliğinde bulunan id değerini al ve onu sayıya çevir."

      const { firstName, lastName, email, tel, pass } = req.body; //!İstemcinin gönderdiği yeni name değerini req.body içinden alıp name değişkenine aktarır.
      if (!firstName || !lastName || !email || !tel || !pass) //degerler bos mu? diye bakiliyor
      {
            //burada gelen degerler uygun mu gercekten ad mi emailmi pass mi kurallara uygun mu
            return res.status(400).json("Hatalı veri geldi");
      }

      // 404: urun var mı?
      const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));//!jsondaki veriyi cek
      const user = users.find(u => u.id === id);
      //!products.find(s => s.id === id)= products dizisindeki tüm ürünleri tek tek kontrol eder, id'si aranan id ile aynı olan ilk ürünü bulup döndürür.

      if (!user) {
            return res.status(404).json({
                  //! return işlemi yapıp fonksiyondan çıkar, res kullanıcıya cevap gönderir, status(404) bulunamadı durum kodu verir, json() cevabı JSON formatında gönderir.
                  error: "Güncellenecek kullanici bulunamadı."
            });
      }

      //Urunun keylerindeki degeri istekle gelen degerlere ata 
      user.firstName = firstName.trim();
      user.lastName = lastName;
      user.email = email;
      user.tel = tel;
      user.pass = pass;

      //guncellenen product dizisini tekrardan dosyaya yaz 
      fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

      // 200: basarili
      res.status(200).json(user);
});





//? ADMIN ORDERS KISMI -SELECT
//!get orders endpointi
app.get("/api/orders", (req, res) => {

      const data = fs.readFileSync("orders.json", "utf-8");//! orders.json dosyasini oku icindeki bilgileri utf 8 formatinda al  ve sonucu data isimli değişkene koy."
      res.status(200).json(JSON.parse(data));//! Dosyadan okunan veriyi hazırlar ve kullanıcıya JSON formatında cevap olarak döndürür.

});

//!DELETE Order SIL
app.delete("/api/orders/:id", (req, res) => {
      //!Buradaki  ":" şu anlama gelir=  Buraya dinamik (değişebilir) bir değer gelecek.Yani Express diyor ki"Buraya hangi sayı gelirse gelsin onu bana yakala."hangi urunun guncellenecegini bilmek gerektigi icin id ekleniyor
      //!genel mantik="/api/products/:id" adresine gelen PUT isteğinde, URL'deki id değerini alarak o ürünü güncellemek için kullanılır.

      const id = Number(req.params.id);
      //!req.params → URL'deki değişken değerleri (örneğin id) yakalamak için kullanılır.
      //!Number(req.params.id)=Request'in içindeki params özelliğinde bulunan id değerini al ve onu sayıya çevir."

      // 404: urun var mı?
      const orders = JSON.parse(fs.readFileSync("orders.json", "utf-8"));//!jsondaki veriyi cek
      const order = orders.find(o => o.id === id);
      //!users.find(s => s.id === id)= users dizisindeki tüm ürünleri tek tek kontrol eder, id'si aranan id ile aynı olan ilk ürünü bulup döndürür.

      if (!order) {
            return res.status(404).json({
                  //! return işlemi yapıp fonksiyondan çıkar, res kullanıcıya cevap gönderir, status(404) bulunamadı durum kodu verir, json() cevabı JSON formatında gönderir.
                  error: "Silinecek Siparis bulunamadi."
            });
      }
      orders.splice(orders.indexOf(order), 1);

      //guncellenen product dizisini tekrardan dosyaya yaz 
      fs.writeFileSync("orders.json", JSON.stringify(orders, null, 2));

      // 200: basarili
      res.status(200).json("Siparis silindi");
});

//?PUT GUNCELLE 
app.put("/api/orders/:id", (req, res) => {


      const id = Number(req.params.id);
      const { status } = req.body;
      if (!status) //degerler bos mu? diye bakiliyor
      {
            return res.status(400).json("Hatali veri geldi");
      }

      // 404: urun var mı?
      const orders = JSON.parse(fs.readFileSync("orders.json", "utf-8"));
      const order = orders.find(o => o.id === id);

      if (!order) {
            return res.status(404).json({
                  error: "Güncellenecek Siparis bulunamadi."
            });
      }
      order.o_status = status;

      fs.writeFileSync("orders.json", JSON.stringify(orders, null, 2));
      res.status(200).json("Siapris Guncellendi");
});


//?  POST ORDERS-CHECKOUT-INSERT INTO
app.post("/api/orders", (req, res) => { //!POST → yeni veri göndermek / oluşturmak."Ben bu sunucuda yeni veri ekleme işlemi yapacağım.(app.post ile) request=istek."
      try {
            const { sepet, order, amount } = req.body
            const roundedAmount = Math.round(amount * 100) / 100;

            if (!(sepet.length > 0) || !(order.length > 0)) {
                  return res.status(400).json("Eksik Veri Geldi");
            }
            else {
                  const orders = JSON.parse(fs.readFileSync("orders.json", "utf-8"));

                  let products = [], pids = [];
                  for (let i = 0; i < sepet.length; i++) {
                        products.push(sepet[i].name)
                        pids.push(sepet[i].id)
                  }
                  //pids icerisinde yer alan idleri productsdaki id ile eslesen idler varsa stok degerlerini 1 dusurmelisin


                  const newOrder = {
                        // id: orders.length + 1,
                        // id:Number(orders[orders.length-1].id)+1
                        id: Number(orders[orders.length - 1]?.id || 0) + 1,
                        o_no: "#" + order[0].firstName[0] + order[0].lastName[0] + (orders.length * 100 + 5),
                        o_products: products,
                        o_pids: pids,
                        o_person: order[0].firstName + " " + order[0].lastName,
                        o_address: order[0].address + " " + order[0].state + "/" + order[0].country,
                        o_amount: roundedAmount,
                        o_date: new Date().toLocaleDateString('tr-TR'),
                        o_status: "Hazirlaniyor",
                  }
                  orders.push(newOrder);
                  fs.writeFileSync("orders.json", JSON.stringify(orders, null, 2));



                  //!STOK DUSURME
                  const allproducts = JSON.parse(fs.readFileSync("products.json", "utf-8"));

                  //for ile pids icindeio idleri don 
                  for (let i = 0; i < pids.length; i++) {
                  const product = allproducts.find(p => p.id === pids[i]);
                  product.stock--;
                  }
                  fs.writeFileSync("products.json", JSON.stringify(allproducts, null, 2));










                  res.status(201).json("Siparis Alindi");
            }
      }
      catch (e) {

            res.status(500).json("Sunucuda Hata Oldu")
      }
});







//?   ADMIN MESSAGES  KISMI
//!get messages endpointi
app.get("/api/messages", (req, res) => {

      const data = fs.readFileSync("messages.json", "utf-8");//! orders.json dosyasini oku icindeki bilgileri utf 8 formatinda al  ve sonucu data isimli değişkene koy."

      res.status(200).json(JSON.parse(data));//! Dosyadan okunan veriyi hazırlar ve kullanıcıya JSON formatında cevap olarak döndürür.


});

//!DELETE MESSAGE ENDPOINTI MESAJ SIL
app.delete("/api/messages/:id", (req, res) => {

      const id = Number(req.params.id);

      // 404: urun var mı?
      const messages = JSON.parse(fs.readFileSync("messages.json", "utf-8"));//!jsondaki veriyi cek
      const message = messages.find(m => m.id === id);

      if (!message) {
            return res.status(404).json({
                  error: "Silinecek Mesaj bulunamadi."
            });
      }
      messages.splice(messages.indexOf(message), 1);

      fs.writeFileSync("messages.json", JSON.stringify(messages, null, 2));

      // 200: basarili
      res.status(200).json("Mesaj silindi");
});

//?PUT GUNCELLE 
//!PUT MESSAGE ENDPOINTI
app.put("/api/messages/:id", (req, res) => {

      const id = Number(req.params.id);

      const { firstName, lastName, email, code, tel, getMessages, contactMessage } = req.body;


      if (!firstName || !lastName || !email || !code || !tel || !getMessages || !contactMessage) //degerler bos mu? diye bakiliyor
      {
            return res.status(400).json("Hatali mesaj geldi");
      }
      // 404: urun var mı?
      const messages = JSON.parse(fs.readFileSync("messages.json", "utf-8"));//!jsondaki veriyi cek
      const message = messages.find(m => m.id === id);

      if (!message) {
            //*bunlar uygun mu?
            return res.status(404).json({
                  error: "Güncellenecek Mesaj bulunamadi."
            });
      }

      //Urunun keylerindeki degeri istekle gelen degerlere ata 
      message.firstName = firstName;
      message.lastName = lastName;
      message.email = email;
      message.code = code;
      message.tel = tel;
      message.getMessages = getMessages;
      message.contactMessage = contactMessage;

      //guncellenen product dizisini tekrardan dosyaya yaz 
      fs.writeFileSync("messages.json", JSON.stringify(messages, null, 2));

      // 200: basarili
      res.status(200).json("Mesaj Guncellendi");
});

//!POST MESSAGES ENDPOINTI-MESAJ EKLE
app.post("/api/messages", (req, res) => { //!?POST → yeni veri göndermek / oluşturmak."Ben bu sunucuda yeni veri ekleme işlemi yapacağım.(app.post ile) request=istek."
      //!req (request) → Kullanıcının gönderdiği bilgiler.
      //!res (response) → Sunucunun kullanıcıya vereceği cevap.

      try {
            const { firstName, lastName, email, code, tel, subject, message } = req.body;

            if (!firstName || !lastName || !email || !code || !tel || !subject || !message) {
                  return res.status(400).json("Hatali Mesaj Geldi")
            }

            //! EMAIL KONTROLÜ
            if (!validateEmail(email)) {
                  return res.status(400).json("E-mail formati hatali");
            }


            //!AD 
            if (!validateName(firstName)) {
                  return res.status(400).json("Ad bilgisi hatali");
            }


            //! SOYAD KONTROLÜ
            if (!validateSurname(lastName)) {
                  return res.status(400).json("Soyad bilgisi hatali");
            }

            //! TELEFON KONTROLÜ
            if (!validateTel(tel)) {
                  return res.status(400).json("Telefon bilgisi hatali");
            }

            else {
                  const data = JSON.parse(fs.readFileSync("messages.json", "utf-8"));//!jsondaki veriyi cek

                  const newMessages = {
                        id: data.length + 1,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        code: code,
                        tel: tel,
                        subject: subject,
                        message: message,

                  };
                  data.push(newMessages);

                  fs.writeFileSync("messages.json", JSON.stringify(data, null, 2));

                  res.status(201).json("Mesaj Basariyla Eklendi");
            }






      }
      catch (e) {
            res.status(500).json("Sunucu Hatasi")
      }
});








// ? CONTACT SAYFASI  SEND MESSAGES KISMI
//!POST CONTACT ENDPOINTI
app.post("/api/contact", (req, res) => {
      try {
            const { firstName, lastName, email, code, tel, subject, message } = req.body
            if (!firstName || !lastName || !email || !code || !tel || !subject || !message) {
                  return res.status(400).json("basarisiz")
            }

            //! EMAIL KONTROLÜ
            if (!validateEmail(email)) {
                  return res.status(400).json("E-mail formati hatali");
            }


            //!AD 
            if (!validateName(firstName)) {
                  return res.status(400).json("Ad bilgisi hatali");
            }

            //! SOYAD KONTROLÜ
            if (!validateSurname(lastName)) {
                  return res.status(400).json("Soyad bilgisi hatali");
            }

            //! TELEFON KONTROLÜ
            if (!validateTel(tel)) {
                  return res.status(400).json("Telefon bilgisi hatali");
            }


            const messages = JSON.parse(fs.readFileSync("messages.json", "utf-8"));

            const newMessage =
            {
                  id: messages.length + 1,
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  code: code,
                  tel: tel,
                  subject: subject,
                  message: message,
            };
            messages.push(newMessage);

            fs.writeFileSync("messages.json", JSON.stringify(messages, null, 2));

            res.status(201).json("basarili");

      }
      catch (e) {

            res.status(500).json("basarisiz")
      }
});































const PORT = 3001;
app.listen(PORT, () => console.log(`Backend:http://localhost:${PORT}`));// app.listen=Express uygulaması belirtilen portta çalışmaya başlasın ve gelen istekleri beklesin."//genel satir mantigi="Express uygulamasını PORT değişkeninde yazan numarada çalıştır. Sunucu başarıyla açılırsa konsola backend adresini yazdır."
