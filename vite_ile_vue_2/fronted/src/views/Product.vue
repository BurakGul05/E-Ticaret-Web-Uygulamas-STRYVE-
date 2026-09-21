<template>
      <!-- !PRODUCT ICERIK-- YALNIZ IMG LERI KABUL ETMEMISTI -->
      <div class="page-title">
            <h1>ÜRÜNLERİMİZ</h1>
      </div>

      <!-- <div class="container">
            <div class="product-grid">
                  <div class="product-card" v-for="product, index in products">

                     
                         <div class=" product-image">
                        <img :src="product.image" width="300px" height="300px" :alt="product.name">
                        </div> 

                        <div class=" product-info">
                              <h3>{{ product.name }}</h3>
                              <p>{{ product.description }}</p>
                              <p>Stok:{{ product.stock }}</p>

                              <h3  style="color: white;">{{ product.price }}₺ </h3>
                              <div>
                                    <div  class="mb-3">
                                          <label style="color: white;" >Adet:</label>
                                          <input min="1" value="1" type="number" >
                                    </div>
                                  
                                    <button class="btn btn-primary" @click="sepeteEkle(index)">Sepete Ekle</button>
                              </div>
                        </div>
                  </div>
            </div>
      </div> -->





      <div class="row">
            <div class="col-4 mt-3" v-for="p, index in products">
                  <div class="card" style="width: 100%; height: 490px;">
                        <img style="height: 200px; width: 300px; margin: auto;" src="../assets/img/salonresim.jpg"
                              class="card-img-top" alt="...">
                        <div class="card-body">
                              <h5 class="card-title">{{ p.name }}</h5>
                              <p class="card-text">Stok: {{ p.stock }}</p>
                              <input type="number"  min="1" v-model="p.quantity" class="form-control mb-2"
                                    style="width: 70px;">
                              <p class="card-text">Fiyat: {{ p.price }}₺</p>
                              <p class="card-text">{{ p.description }}</p>

                              <button v-if="p.stock" @click="addCart(index)" class="btn btn-primary" type="submit">Sepete Ekle
                              </button>

                              <button v-else class="btn btn-secondary" disabled>Stok Yok!</button>



                        </div>
                  </div>
            </div>

      </div>















</template>


<script>
export default {
      inject: ['sepet'],
      data() {
            return {
                  products: [],
                  baseUrl: "http://localhost:3001",
            }

      },
      mounted() {
            this.getProducts();
      },
      watch: {

      },
      computed: {

      },
      methods: {
            async getProducts() {
                  try {
                        const res = await fetch(`${this.baseUrl}/api/products`);

                        if (!res.ok) {
                              throw new Error("Products endpoint hatasi");
                        }

                        this.products = await res.json();

                  } catch (e) {

                        console.log(e.message);
                  }
            },

            addCart(index) {
                  this.products[index].quantity = this.products[index].quantity || 1; //kullanici 3 girerse 3 olur yoksa 1 olur 
                  this.sepet.push(this.products[index]);
                  alert("Sepete Eklendi");


                  //sepetteki urunlerin adetide sepette gozuksun
                                                            
                  //eger kullanici sepetinde bu urunden stok kadar varsa en fazla stok kadar urun ekleyebilirsin diyip sepete ekleme

                  //her sepete tikladiginda ordaki urunlerin stogunu check edecek

            }
      }
};
</script>

<style scoped></style>
