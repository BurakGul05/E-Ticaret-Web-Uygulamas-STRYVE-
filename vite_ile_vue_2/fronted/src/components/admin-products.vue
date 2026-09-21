<script setup>
// import { inject } from 'vue';
// const p = inject('p')
</script>

<template>

      <!--! Ürünlerimiz -->
      <h3 style="color: red;">Ürünler</h3>
      <button style="float: right;" type="button" class="btn-sm btn btn-outline-success" data-bs-toggle="modal"
            data-bs-target="#addproduct">
            Ürün Ekle
      </button>

      <table class="table table-striped">
            <thead>
                  <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Ad</th>
                        <th scope="col">Stok</th>
                        <th scope="col">Fiyat</th>
                        <th scope="col">KDV'li Fiyat</th>
                        <th scope="col">Aciklama</th>
                          <th scope="col">İşlem</th>
                  </tr>
            </thead>
            <tbody>
                  <tr v-for="product,  in products">
                        <!--! index + 1 yerine ürünün gerçek kimlik numarası prdouct.id (id) gösteriliyor. index değişebilir ama id değişmez. -->
                        <th scope="row">{{ product.p_id }}</th>
                        <td><input class="form-control" type="text" v-model="product.p_name"> </td>
                        <td><input class="form-control" type="number" min="0" v-model="product.p_stock"> </td>
                        <td><input class="form-control" type="text" v-model="product.p_price"> </td>
                        <td>{{ product.p_price * 1.2 }} </td>
                       <td><textarea class="form-control" type="text " v-model="product.p_desc" ></textarea></td> 
                        <td>
                              <div class="text-nowrap">
                                    <button
                                          @click="updateProduct(product.p_id, product.p_name, product.p_stock, product.p_price,product.p_desc)"
                                          class="btn-sm btn btn-outline-primary">Güncelle</button>

                                    <button style="margin-left: 10px;" class="btn-sm btn btn-outline-danger"
                                          @click="deleteProduct(product.p_id)">Sil</button>

                              </div>
                        </td>
                  </tr>
            </tbody>
      </table>

      <!--! ürün ekle modal'ı -->
      <div class="modal fade" id="addproduct" tabindex="-1">
            <div class="modal-dialog">
                  <div class="modal-content">
                        <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel">Ürün Ekle</h1>
                              <button type="button" class="btn-close " data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <!--! Ürün ekleme Formu  -->
                        <form @submit.prevent="addProduct()">
                              <div class="modal-body">

                                    <div class="row">
                                          <div class="col-12 mb-3">
                                                <label class="form-label">Urun Adi:</label>
                                                <input type="text" class="form-control" v-model="newProduct[0].p_name"
                                                      required>
                                          </div>
                                          <div class="col-6">
                                                <label class="form-label">Stok:</label>
                                                <input type="number" class="form-control" min="0"
                                                      v-model="newProduct[0].p_stock" required>
                                          </div>
                                          <div class="col-6">
                                                <label class="form-label">Fiyat:</label>
                                                <input type="text" class="form-control" v-model.number="newProduct[0].p_price"
                                                      pattern="[0-9]+([.][0-9]{1,2})?" required>
                                          </div>

                                          <div class="col-12 mt-3">
                                                <label class="form-label">Ürün Açıklaması:</label>
                                                <textarea class="form-control" v-model="newProduct[0].p_desc" required>
                                                </textarea>
                                          </div>

                                    </div>
                              </div>
                              <div class="modal-footer">
                                    <button class="btn btn-success w-100" type="submit">Ürün Ekle</button>
                                    <label> {{ productMessage }} </label>
                                    <!--! Sayfa ilk açıldığında ekranda hiçbir şey görünmez, çünkü productMessage'ın değeri nulldır. -->

                              </div>
                        </form>
                  </div>
            </div>
      </div>

</template>

<script>

export default {
      data() {
            return {
                  newProduct: [
                        { p_name: "", p_stock: 0, p_price: 0, p_desc: "" }
                  ],
                  products: [],
                  productMessage: null,
                  baseUrl: "http://localhost:3001"
            };
      },
      mounted() {
            this.getProducts();
      },

      unmounted() {

      },

      watch: {
      },
      computed: {
      },
      methods: {
            //GET-URUNLERI CEKTIK
            async getProducts() {
                  try {
                        const res = await fetch(`${this.baseUrl}/api/products`);
                        if (!res.ok) throw new Error("Products endpoint hatası");
                        this.products = await res.json();
                  } catch (e) {
                        console.log(e.message);
                  }
            },

            // POST- URUNLERI EKLEME
            async addProduct() {
                  try {//!bu kodlari calistirmayi dene eger hata alirsan catche git
                        const res = await fetch(`${this.baseUrl}/api/products`, {
                              method: "POST",
                              headers: { //!Başlık / üst bilgi.HTTP isteğinin yanında gönderilen ek bilgilerdir.

                                    "Content-Type": "application/json" // Content-Type=Gönderdiğim içeriğin türü nedir?

                              },
                              body: JSON.stringify({//body = asil gonderilen veri demek

                                    name: this.newProduct[0].p_name, //Formdaki isim bilgisini al.
                                    stock: this.newProduct[0].p_stock,//Formdaki stock bilgisini al.
                                    price: this.newProduct[0].p_price,//Formdaki price bilgisini al.
                                    desc: this.newProduct[0].p_desc//Formdaki price bilgisini al.

                              })
                        });
                        if (!res.ok) throw new Error("addProduct endpoint hatası");

                        const data = await res.json(); //Backend'in gönderdiği cevabı JSON olarak oku.

                        this.productMessage = data; //Backend'den gelen mesajı Vue'daki productMessage değişkenine kaydet.sunucu eklendi dedigi zamam gosterir

                        this.getProducts();// ekledikten sonra birdaha cek demek gerekiyor. her seferinde refresh atmamak icin. Yeni ürün eklendikten sonra backend'deki güncel ürün listesini tekrar çekerek ekranı yeniler.

                        //Kullanıcı yeni ürün ekledikten sonra eski bilgiler kutularda kalmasın diye giriş alanlarını başlangıç değerlerine döndürür.
                        this.newProduct[0].p_name = "";
                        this.newProduct[0].p_stock = 0;
                        this.newProduct[0].p_price = 0;
                        this.newProduct[0].p_desc = "";
                  }
                  catch (e) {
                        this.productMessage = e.message;// eger hata alirsa catch calisiyor ve urun ekle butonu altinda urun basariyla eklendi kismina failed yazisi geliyor 
                  }
            },

            // PUT- Urun Guncelleme
            async updateProduct(p_id, p_name, p_stock, p_price,p_desc) {
                  try {

                        const res = await fetch(`${this.baseUrl}/api/products/${p_id}`, {


                              method: "PUT",
                              headers: { 

                                    "Content-Type": "application/json" 
                              },
                              body: JSON.stringify({

                                    name: p_name,
                                    stock: p_stock,
                                    price: p_price,
                                    desc:p_desc
                              })
                        });
                        if (!res.ok) throw new Error("updateProduct endpoint hatasi");

                        const data = await res.json(); //Backend'in gönderdiği cevabı JSON olarak oku.

                        if (data) {
                              alert(data)
                        }
                        this.getProducts();//guncelle isleminden sonra tekrardan verileri cek
                  }
                  catch (e) {
                        console.log(e.message);// eger hata alirsa catch calisiyor ve urun ekle butonu altinda urun basariyla eklendi kismina failed yazisi geliyor 
                  }
            },


            //DELETE URUN SIL
            async deleteProduct(p_id) {
                  try {
                        const res = await fetch(`${this.baseUrl}/api/products/${p_id}`, {

                              method: "DELETE",
                              headers: { 

                                    "Content-Type": "application/json" 
                              },             

                        });
                        if (!res.ok) throw new Error("deleteProduct endpoint hatası");

                        const data = await res.json(); 

                        if (data) {
                              alert(data)
                        }
                        this.getProducts();
                  }
                  catch (e) {
                        console.log(e.message);
                  }
            },
      }
};
</script>


<style scoped></style>