<template>
      <div class="test2-icerik">
            <h1 style="color: white;">Test 2 sayfamız</h1>
            <div style="font-family: Arial; padding: 20px;">
                  <h2 >Vue + Node.js Basit Örnek</h2>
                  <!-- !buttonlara tiklaninca methodlar cagrilip istek atiyoruz -->
                  <button @click="getHello()" style="margin-right: 10px;">Hello çağır</button>
                  <button @click="getProducts()">Urunleri  çek</button>
                  <!-- !Eger helloda deger varsa (true) doner burasi gozukur hale gelir  -->
                  <p v-if="hello" style="margin-top: 16px;">
                        <b>Backend mesajı:</b> {{ hello.message }} <br />
                        <b>Zaman:</b> {{ hello.time }}
                  </p>

                  <h3 style="  margin-top:  24px;">Urunler</h3>
                  <!-- ! Urunleri listeliyoruz  -->
                  <ul>
                        <li v-for="p in products" :key="p.id">
                              {{ p.id }} - {{ p.name }}  {{ p.stock }}- {{ p.price }}- {{ p.price * 1.2 }}
                        </li>
                  </ul>
                  <!-- ! eger error degeri doluysa burasi calisir  -->
                  <p v-if="error" style="color: red;"><b>Hata:</b> {{ error }}</p>
            </div>
      </div>
</template>


<script>
export default {
      data() {
            return {
                  hello: null,//Peki neden boş?
                  //sunucu yazida dizide gonderebilir belli degil
                  //Mesaj nerede?
                  //Backend'de

                  products: [], //Backend'den gelecek urunler listesini tutmak için başlangıçta boş bir dizi oluşturur.

                  error: null,//Başta boş olan hata alanı, işlem sırasında hata olursa hata mesajını tutar.

                  baseUrl: "http://localhost:3001"//Backend'in çalıştığı ana adresi saklar, endpoint yolları bunun üzerine eklenir. istek attigimiz yer 
            };
      },
      mounted() {

      },

      watch: {
      },

      computed: {
      },

      methods: {
            //! async eklememizin nedeni icersinde await kullandigimiz icin
            //!Bu kodun amacı şu:Vue, backend'deki /api/hello adresine istek atıyor, gelen cevabı alıyor; hata olursa hata mesajını saklıyor.
            async getHello() { //async=asynchronous=Türkçesi:Asenkron (eş zamanlı olmayan)Mantığı:Bazı işlemler zaman alır.await ekledigimiz icin async eklemek zorundayiz
                  this.error = null;//Yeni bir istek başlamadan önce eski hata mesajını temizle.tekrar butona bastiktan sonra temizlenir 

                  try {//!try=denemek.Bu kodu çalıştırmayı dene. Eğer hata çıkarsa yakala

                        const res = await fetch(`${this.baseUrl}/api/hello`);//!Await:beklemek demektir.JavaScript'e diyor ki:"Fetch işlemi bitene kadar burada bekle."Çünkü: Fetch hemen cevap vermez.
                        //genel satir mantigi:Backend'deki /api/hello adresine bir istek gönderir, oradan gelecek cevabı bekler ve gelen cevabı res isimli değişkende tutar.


                        if (!res.ok) throw new Error("Hello endpoint hatası");//!res.ok=Cevap başarılı değilse" throw=firlatmak,--(throw new Error)=Bir hata oluştur ve bunu bildir."Yeni bir hata oluştur ve bunu göster.""

                        this.hello = await res.json();//YANI CEVAP VARSA, genel mantik=Backend'den gelen cevabın içindeki JSON verisini al, bekle ve hello değişkeninin içine koy."
                        //res→ Backend'den gelen cevap
                        //.json()→ Cevabın içindeki JSON verisini oku
                        //await→ Okuma işlemi bitene kadar bekle
                        //this.hello =→ Gelen sonucu hello değişkenine koy

                  } catch (e) {//Eğer yukarıdaki işlemler sırasında bir hata oluşursa, o hatayı yakala ve hata mesajını error değişkeninin içine koy."

                        this.error = e.message;//eger hata olupta catch bloguna girerse;"Hello endpoint hatası"yazisi buraya gelmis oluyor
                  }
            },

            async getProducts() {
                  this.error = null;
                  try {
                        const res = await fetch(`${this.baseUrl}/api/products`);
                        if (!res.ok) throw new Error("Product endpoint hatası");
                        this.products = await res.json();
                  } catch (e) {
                        this.error = e.message;
                  }
            },

            async getOrders() {
                  this.error = null;
                  try {
                        const res = await fetch(`${this.baseUrl}/api/orders`);
                        if (!res.ok) throw new Error("Orders endpoint hatası");
                        this.orders = await res.json();
                  } catch (e) {
                        this.error = e.message;
                  }
            },

      }
};
</script>

<style scoped>

</style>
