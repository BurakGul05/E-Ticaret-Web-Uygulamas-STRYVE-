<!-- !Tasarimlarin oldugu yer -->
<template>
      <div class="test-page">

     
      <h1 style="color: chocolate;">Test sayfamiz</h1>
      <!-- {{ message }} -->

      <!-- ! iki nokta kullanarak birbirine bagladik class ve vueClass'i  -->
      <!--! v-bind ozelligi :(iki nokta) ile degiskenleri, src gibi yapilara baglayarak dinamik hale getiririz  -->
      <!-- <div :class="vueClass">
            v-bind kullaniyoruz.Burada dinamik class kullandik
      </div>

      <button @click="vueClass = 'error'">kirmizi</button>
      <button @click="vueClass = 'success'">yesil</button> -->
      <br><br>

      <!-- <img :src="slider" alt="" height="300px" width="300px"><br>


      <button @click="slider = '../assets/img/slider2.jpg'">slider 2</button>
      <button @click="slider = '../assets/img/slider3.jpg'">slider 3</button> -->





      <!-- ! v-if Kosula bagli olarak kullaniciya firlatir-->
      <!-- <div v-if="loggedIn">Hosgeldin {{ isim }}</div>

      <div v-else>Giris Yapmadiniz</div>

      <button @click="loggedIn = !loggedIn">durum degistir</button> -->








      <br><br>

      <!-- ! Not Durumu Ornegi -->
      <!-- <p v-if="score > 90">harf notunuz: AA😊</p>
      <p v-else-if="score >= 80">harf notunuz: BB😀</p>
      <p v-else-if="score >= 50">harf notunuz: CC😐</p>
      <p v-else>Kaldiniz😟</p>  -->

      <br><br><br>


      <!-- ! V-SHOW  once elementi kosulsuz direk kullaniciya firlatir sonra display:none, display:block display ozelligini degistirir  -->
      <!-- <button @click="durum = !durum">goster/gizle</button><br>
      <img v-show="durum" src="../assets/img/logo.png" alt=""> -->



      <!-- ! v-for liste veya diziyi dondurur tek bir yapi kurup tum listeyi gostertebiliriz -->

      <!-- <table class="table table-striped">

            <thead>
                  <tr>
                        <th scope="col">ID</th>
                        <th scope="col">AD</th>
                        <th scope="col">SOYAD</th>
                        <th scope="col">E-MAIL</th>
                        <th scope="col">PAROLA</th>

                  </tr>
            </thead>

            <tbody>

                  <tr v-for="user, index in users">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ user.ad }}</td>
                        <td>{{ user.soyad }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.parola }}</td>

                  </tr>

            </tbody>

      </table>  -->



      <!-- ? 3 elemanli bir diziyi ul ve li kullanarak yazdirdik -->

      <!-- <ul>
            <li v-for="fruit, index in fruits">

                  {{ index }} - {{ fruit }}

            </li>
      </ul>   -->


      <!-- ! v-on =@ kullanici bir etkilesime giriyorsa kullaniyoruz orn buttona @click -->
      <!--! v-model : inputlari degiskenlere baglmak icin kullaniriz  -->

      <button @click="uyari('buttona tiklandi')">Tikla</button>
      <br><br><br><br>



      <!-- ! v-model.number degeri sayisal alir v-model.trim girilen degerin basindaki ve sonundaki bosluklari otomatik siler  -->
      <!-- <input type="text" placeholder="1.sayiyi girin" v-model.number="sayi"><br><br>
      {{ sayi * 5 }} -->
      <br><br>

      <!-- ! v-model.trim girilen degerin basindaki ve sonundaki bosluklari otomatik siler  -->
      <!-- <input type="text" placeholder="adinizi girin" v-model.trim="isim">
      {{ isim }} -->
      <br><br>


      <p>v-model.lazy inputtan cikinca degiskeni gunceller </p>
      <input type="text" v-model.lazy="message">
      {{ message }}
      <br><br>

      <p>checkbox vmodel ile listeye bagladigimizda tiklayinca valueye otomotik listey ekler</p>
      <input type="checkbox" v-model="diller" value="VUEJS3">Vuejs3 <br>
      <input type="checkbox" v-model="diller" value="JS"> javascript <br>
      <input type="checkbox" v-model="diller" value="HTML"> HTML <br>
      {{ diller }}
      <br><br>


      <p>select yapisinda secilen optionun degerini degiskene atar burada selecti vmodel ile bagliyoruz </p>
      <select v-model="sehir">
            <option value="34">istanbul</option>
            <option value="06">ankara</option>
            <option value="35">izmir</option>
      </select>
      {{ sehir }}
      <br><br>


      <p>Stokta urun varsa yesil renkte stokta var stok sayisi 0 ise kirmizi sekilde tukendi yazacak</p>
      <input type="text" placeholder="stok bilgisini sayisini girin" v-model="stock">
      <p></p>


      <!--!  farkli ornek -->
      <!-- <p v-if="stock > 0" class="text-success">
            Stokta var
      </p>

      <p v-else class="text-danger">
            Tükendi
      </p> -->
      <br><br><br>



      <!-- !baska ornek -->
      <p :class="stock > 0 ? 'text-success' : 'text-danger'">
            {{ stock > 0 ? 'Stok var' : 'Tukendi' }}
      </p>
      <br><br>




      <!--! yeni ornek -->
      <p> ogrenciler: [
            { name: "Ali", active: true },
            { name: "Ayşe", active: false },
            { name: "Mehmet", active: true }
            ]
      </p>

      <div>

            <div v-for="ogrenci in ogrenciler">
                  <p v-if="ogrenci.active === true">
                        {{ ogrenci.name }}
                  </p>
            </div>

      </div>

      <!--! yeni ornek farkli  -->
      <template v-for="ogrenci in ogrenciler">
            <div v-if="ogrenci.active === true">
                  {{ ogrenci.name }}
            </div>
      </template>


      <!-- !?hocanin ornegi -->
      <ul>
            <template v-for="ogrenci in ogrenciler">
                  <li v-if="ogrenci.active === true">
                        {{ ogrenci.name }}
                  </li>
            </template>
      </ul>
      <br><br><br>


      <!--! filter uyguladik o.active==true olanlardan bir dizi olsutu sonrasinda olusan diziyi dondurduk -->
      <!-- <ul>
            <li v-for="ogrenci in ogrenciler.filter(o => o.active == true)">
                  {{ ogrenci.name }}

            </li>
      </ul>
      <br><br> -->


      <!--! COMPUTENTE KULLANILAN ILK ORNEK -->
      <!--! filtrelenemis ogrencileri compunente hesaplattik ve donus yaptirip (return) vfora yerlestirdik -->
      <ul>
            <li v-for="ogrenci in filtreliOgreciler">
                  {{ ogrenci.name }}

            </li>
      </ul>
      <br><br>



      <!--! input type texten alinan degeri entera basinca gorevler dizisine ekleyip gosteren vue yapisini yazin -->
      <!-- <p>TO-DO LIST</p>
      <input type="text" v-model="gorev" @keyup.enter="gorevEkle()">
      <br>
      {{ gorevler }}
      <ul>
            <li v-for="value, index in gorevler">
                  {{ value }} <span>❌</span>
            </li>
      </ul> -->
      <br><br>



      <!-- !yeni ornek bu hocanin degil hocanin sordugu sorunun ornek kismi -->
      <p>TO-DO LIST</p>
      <input type="text" v-model="gorev" @keyup.enter="gorevEkle()">
      <br>
      {{ gorevler }}

      <ul>
            <li v-for="value, index in gorevler">
                  {{ value }}
                  <span style="cursor: pointer;" @click="gorevSil(index)">❌</span>
            </li>
      </ul>
      <br><br>



      <!-- ?hocanion sordugu sorunun ornegi -->
      <!-- <p>PAROLA KONTROLU</p>
      <input type="password" v-model="password" placeholder="Parolanizi girin">

      <p v-if="password.length > 8">Guclu parola</p>
      <p v-else>Zayif parola</p><br><br> -->


      <!-- ?YINE HOCANIN ORNEGI BENIMKILER AYRI -->
      <!-- <p>PAROLA KONTROLU</p>
      <input type="password" v-model="pass" placeholder="Parolanizi girin">
        {{ pass_kontrol }}    
      </p> -->



      <!--? !HOCANIN SORDUGU SORU VE ORNEGI -->
      <!-- <p>Tema rengi değiştirme</p>
      <div :class="isDark ? 'aciktema' : 'koyutema'">
            Burası değişiyor
      </div>
      <button @click="isDark = !isDark">{{ isDark ? 'Acik tema' : 'koyu tema' }}</button> -->



      <!-- !urun fiyati kdv hesaplama hocanin bu yaptigi sey  -->

      <form @submit.prevent="addProduct()">
            <p>URUN EKLEME </p>
            <label>urun adi</label>
            <input type="text" v-model="newProduct[0].ad" required> <br>

            <label>stok</label>
            <input type="number" min="0" v-model="newProduct[0].stok" required><br>

            <label>fiyat</label>
            <input type="text" v-model="newProduct[0].fiyat" required><br>

            <button class="btn btn-success" type="submit">urun ekle</button><br><br>

      </form>

      {{ Products }}




      <!-- ?!?admin menu HOCANIN ORNEGI YANI  YAPTIGI -->
      <div class=" mb-4">
            <button @click="secim = 'products'" class="btn btn-primary m-2">Urunler</button>
            <button @click="secim = 'users'" class="btn btn-primary m-2">Kullanicilar</button>
            <button @click="secim = 'orders'" class="btn btn-primary m-2">Siparisler</button>
      </div>



      <!-- ! URUNLERIMIZ -->

      <div v-if="secim == 'products'">

            <h3 style="color: red;">URUNLERIMIZ</h3>
            <button style="float: right;" type="button" class="btn-sm btn btn-outline-success" data-bs-toggle="modal"
                  data-bs-target="#addproduct">
                  Ürün Ekle
            </button>
            <table class="table table-striped">

                  <thead>
                        <tr>
                              <th scope="col">ID</th>
                              <th scope="col">URUN ADI</th>
                              <th scope="col">STOK</th>
                              <th scope="col">FIYAT</th>
                              <th scope="col">FIYAT (KDV) DAHIL</th>
                              <th scope="col">islem</th>

                        </tr>
                  </thead>

                  <tbody>

                        <tr v-for="product, index in products">
                              <th scope="row">{{ index + 1 }}</th>
                              <td><input class="form-control" type="text" v-model="product.ad"> </td>
                              <td><input class="form-control" type="number" min="0" v-model="product.stok"> </td>
                              <td><input class="form-control" type="text" v-model="product.fiyat"> </td>
                              <td>{{ product.fiyat * 1.2 }} </td>
                              <td>
                                    <button class=" btn-sm btn btn-outline-primary"
                                          @click="guncelle(index)">Guncelle</button>
                                    <button class=" btn-sm btn btn-outline-danger"
                                          @click="deleteProduct(index)">sil</button>
                              </td>

                        </tr>

                  </tbody>

            </table>
      </div>

      <!-- !KULLANICILAR -->
      <div v-if="secim == 'users'">

            <h3 style="color: red;">KULLANICILAR</h3>
            <button style="float: right;" type="button" class="btn-sm btn btn-outline-success" data-bs-toggle="modal"
                  data-bs-target="#addproduct">
                  Ürün Ekle
            </button>
            <table class="table table-striped">

                  <thead>
                        <tr>
                              <th scope="col">ID</th>
                              <th scope="col">URUN ADI</th>
                              <th scope="col">STOK</th>
                              <th scope="col">FIYAT</th>
                              <th scope="col">FIYAT (KDV) DAHIL</th>
                              <th scope="col">islem</th>

                        </tr>
                  </thead>

                  <tbody>

                        <tr v-for="product, index in products">
                              <th scope="row">{{ index + 1 }}</th>
                              <td><input class="form-control" type="text" v-model="product.ad"> </td>
                              <td><input class="form-control" type="number" min="0" v-model="product.stok"> </td>
                              <td><input class="form-control" type="text" v-model="product.fiyat"> </td>
                              <td>{{ product.fiyat * 1.2 }} </td>
                              <td>
                                    <button class=" btn-sm btn btn-outline-primary"
                                          @click="guncelle(index)">Guncelle</button>
                                    <button class=" btn-sm btn btn-outline-danger"
                                          @click="deleteProduct(index)">sil</button>
                              </td>

                        </tr>

                  </tbody>

            </table>
      </div>

      <!-- !SIPARISLER -->
      <div v-if="secim == 'orders'">

            <h3 style="color: red;">SIPARISLER</h3>
            <button style="float: right;" type="button" class="btn-sm btn btn-outline-success" data-bs-toggle="modal"
                  data-bs-target="#addproduct">
                  Ürün Ekle
            </button>
            <table class="table table-striped">

                  <thead>
                        <tr>
                              <th scope="col">ID</th>
                              <th scope="col">URUN ADI</th>
                              <th scope="col">STOK</th>
                              <th scope="col">FIYAT</th>
                              <th scope="col">FIYAT (KDV) DAHIL</th>
                              <th scope="col">islem</th>

                        </tr>
                  </thead>

                  <tbody>

                        <tr v-for="product, index in products">
                              <th scope="row">{{ index + 1 }}</th>
                              <td><input class="form-control" type="text" v-model="product.ad"> </td>
                              <td><input class="form-control" type="number" min="0" v-model="product.stok"> </td>
                              <td><input class="form-control" type="text" v-model="product.fiyat"> </td>
                              <td>{{ product.fiyat * 1.2 }} </td>
                              <td>
                                    <button class=" btn-sm btn btn-outline-primary"
                                          @click="guncelle(index)">Guncelle</button>
                                    <button class=" btn-sm btn btn-outline-danger"
                                          @click="deleteProduct(index)">sil</button>
                              </td>

                        </tr>

                  </tbody>

            </table>
      </div>







      <!-- !BENIM KENDI ORNEGIM HOCADAN AYRI -->
      <!-- <div class="container mt-4">
  
  <div class="mb-4">
    <button class="btn btn-outline-primary me-2" @click="secim = 'products'">Urunlerimiz</button>
    <button class="btn btn-outline-primary me-2" @click="secim = 'users'">Kullanicilar</button>
    <button class="btn btn-outline-primary" @click="secim = 'orders'">Siparisler</button>
  </div>

  <hr>

  <div v-if="secim == 'products'">
   
    <p></p>
  </div>

  <div v-if="secim == 'users'">
   
    <p></p>
  </div>

  <div v-if="secim == 'orders'">
    
    <p></p>
  </div>

</div> -->



















      <!-- Button trigger modal -->
      <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
      </button> -->

      <!--! URUN EKLE MODALI -->
      <div class="modal fade" id="addproduct" tabindex="-1">
            <div class="modal-dialog">
                  <div class="modal-content">
                        <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <form @submit.prevent="addProduct()">
                              <div class="modal-body">


                                    <!-- !urun ekleme -->
                                    <div class="row">

                                          <div class="col-12 mb-3">
                                                <p>URUN EKLEME </p>
                                                <label class="form-label">Urun Adi</label>
                                                <input type="text" class="form-control" v-model="newProduct[0].ad"
                                                      required>
                                                <br>

                                          </div>




                                          <div class="col-6">
                                                <label class="form-label">Stok</label>
                                                <input type="number" class="form-control" min="0"
                                                      v-model="newProduct[0].stok" required><br>


                                          </div>



                                          <div class="col-6">
                                                <label class="form-label">Fiyat</label>
                                                <input type="text" class="form-control" v-model="newProduct[0].fiyat"
                                                      pattern="[0-9]+([.][0-9]{1,2})?" required><br>
                                                <small style="color: red;" v-if="errorFiyat">
                                                      hatali deger girdiniz

                                                </small>


                                          </div>

                                    </div>


                              </div>
                              <div class="modal-footer">

                                    <button class="btn btn-success" type="submit">Urun Ekle</button>

                              </div>
                        </form>
                  </div>
            </div>
      </div>








      <!-- <input @keyup.enter="search()" type="text" v-model="search_metin">
      <button @click="search()">search</button>
      <br><br>

      <p @click.self="uyari('p tagine tiklandi')">normalde p tagine tiklayamazsin</p>

      <img height="50px" @click.self="uyari('resime tiklandi')" src="../assets/img/logo.png" alt=""> -->

      <br><br>

      <!-- !?BURASIDA BENIM KENDI YAZDIGIM KISIM  -->
      <!-- <button @click="uyari('buttona tiklandi')">DOKUN</button><br>
      <input  @keyup.enter="search()" type="text" v-model="search_metin"><br>
      <button @click="search()">Search</button><br><br>
      <p @click.self="uyari('p tagine tiklandi')">normalde p tagine tiklanmaz</p>
      <img @click.self="uyari('resime tiklandi')" src="../assets/img/logo.png" height="50px" alt=""><br><br><br> -->




 </div>
</template>

<!-- !programlama ve fonksiyonlarin oldugu yer  -->
<script>
import { Alert } from 'bootstrap/dist/js/bootstrap.min';


export default {
      //!  Data degisken tanimladigimiz yer 
      data() {
            return {
                  newProduct: [
                        { ad: "", stok: 0, fiyat: 0 }

                  ],
                  products: [
                        { ad: "nike", stok: 0, fiyat: 0 }

                  ],
                  secim: 'products',










                  gorev: "",
                  gorevler: [],
                  isDark: false,

                  pass: "",
                  pass_kontrol: "",

                  stock: "",
                  sehir: "",
                  diller: [],
                  message: "Merhaba Burak",
                  ogrenciler: [
                        { name: "Ali", active: true },
                        { name: "Ayşe", active: false },
                        { name: "Mehmet", active: true }
                  ],
                  sayi: 0,

                  slider: "../assets/img/slider1.jpg",
                  vueClass: "success",

                  loggedIn: true,
                  isim: "",

                  score: 50,
                  durum: true,

                  fruits: [
                        "elma",
                        "armut",
                        "muz"
                  ],



                  users: [
                        { ad: "ahmet", soyad: "cinar", email: "ahmet@hotmail.com", parola: "1234" },
                        { ad: "kerem", soyad: "atlihan", email: "kerem@hotmail.com", parola: "kerem123" },
                        { ad: "cagri", soyad: "yalcin", email: "cagri@hotmail.com", parola: "cagri1234" },


                  ],

                  search_metin: ""

            };
      },

      //! sayfa(component) ilk yuklendiginde direk calisacak kodlar
      mounted() {

      },

      //! Degisken izler.degiskenlerde degisiklik yapildiginda calismasini istedigimiz kodlari buraya yazariz 
      watch: {
            pass(value) {

                  if (value.length >= 8) this.pass_kontrol = "dogru"
                  else this.pass_kontrol = "yanlis"

            }
      },

      //! var olan dizi uzerinde degisiklik yapacaksak ve yeni deger ureteceksek kullaniriz  ornegin kdv hesaplama , indirim hesaplama
      computed: {
            filtreliOgreciler() {
                  return this.ogrenciler.filter(ogrenci => ogrenci.active == true)

            },

      },

      //! bildigimiz fonksiyonlar bir etkilesime girince calisacak fonksiyonlari burada tanimlariz  
      methods: {
            uyari(value) {
                  alert(value)
                  console.log(value)
            },

            search() {
                  alert("arama yapiliyor" + this.search_metin)
            },
            gorevEkle() {
                  this.gorevler.push(this.gorev)
                  this.gorev = ""
            },
            gorevSil(index) {
                  alert(index)
                  this.gorevler.splice(index, 1)
            },
            addProduct() {





                  this.products.push({
                        ad: this.newProduct[0].ad,
                        stok: this.newProduct[0].stok,
                        fiyat: this.newProduct[0].fiyat
                  })
                  this.newProduct[0].ad = "";
                  this.newProduct[0].stok = 0;
                  this.newProduct[0].fiyat = 0;
            },

            deleteProduct(index) {

                  this.products.splice(index, 1);
            },
            getUsers(){
                 this.users=localStorage.getItem('registerStorage')
            }

      }




}

</script>


<!-- ! CSS kodlarimin oldugu yer  -->
<!-- ! Scoped yazmamizin nedeni buraya yazacagimiz css lerin sadece bu sayfaya etki etmesini istiyoruz  -->
<style scoped>
.success {
      background-color: greenyellow;

}

.error {
      background-color: red;
}

p {
      font-weight: bold;
      color: rgb(243, 3, 3);
}

.aciktema {
      height: 300px;
      width: 300;
      background-color: antiquewhite;
      color: black;

}

.koyutema {
      height: 300px;
      width: 300;
      background-color: black;
      color: white;

}

.td {
      color: white;
}

.th {
      color: white;
} 



</style>
