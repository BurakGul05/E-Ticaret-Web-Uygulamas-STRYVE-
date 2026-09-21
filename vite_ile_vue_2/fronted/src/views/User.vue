<script setup>
import adminProducts from '@/components/admin-products.vue'
import adminOrders from '@/components/admin-orders.vue'
import router from '@/router';




</script>


<template>

      <div style="width: 200px; position: absolute; top: 120px;" class=" bg-primary offcanvas offcanvas-start show"
            tabindex="-1">
            <div class="offcanvas-header">
                  <h5 style="color: white;" class="offcanvas-title"> Kullanici Yonetim Paneli</h5>
            </div>
            <div class="offcanvas-body">
                  <div class="mb-4">
                        <button style="color: black; background-color: aliceblue;" @click="secim = 'products'"
                              :class="secim == 'products' ? 'btn btn-light m-2 w-100' : 'btn btn-outline-light m-2 w-100'">Ürünler</button>
                        
                        <button style="color: black; background-color: aliceblue;" @click="secim = 'orders'"
                              :class="secim == 'orders' ? 'btn btn-light m-2 w-100' : 'btn btn-outline-light m-2 w-100'">Siparişler</button>
                       
                  </div>

                  <div style="bottom: 20px; position: absolute;">
                        <div class="mb-2">
                              <h5 class="text-white">{{ Username }}</h5>
                        </div>
                        <div>
                              <button class="btn btn-light btn" @click="setProfile()"><i
                                          class="bi bi-gear-fill"></i></button>
                              <button style="margin-left: 10px;" class="btn btn-light btn" @click="logout()"><i
                                          class="bi bi-box-arrow-right"></i></button>
                        </div>
                  </div>

            </div>
      </div>

      <div class="admin-content">




            <!-- <h1 style="color:antiquewhite">ADMİN SAYFASI</h1> -->
            <!--! Admin-menu  -->
            <!-- <div class="mb-4">
                  <button @click="secim = 'products'"
                        :class="secim == 'products' ? 'btn btn-primary m-2' : 'btn btn-outline-primary m-2'">Ürünler</button>
                  <button @click="secim = 'users'"
                        :class="secim == 'users' ? 'btn btn-primary m-2' : 'btn btn-outline-primary m-2'">Kullanıcılar</button>
                  <button @click="secim = 'orders'"
                        :class="secim == 'orders' ? 'btn btn-primary m-2' : 'btn btn-outline-primary m-2'">Siparişler</button>
                  <button @click="secim = 'messages'"
                        :class="secim == 'messages' ? 'btn btn-primary m-2' : 'btn btn-outline-primary m-2'">Mesajlar</button>
            </div> -->

            <!--! Ürünlerimiz -->
            <div v-if="secim == 'products'">
                  <adminProducts />
            </div>

           
            <!--! Siparişler -->
            <div v-if="secim == 'orders'">
                  <adminOrders />
            </div>

      </div>

</template>


<!--! Programlama ve fonksiyonların olduğu yer -->
<script>
export default {
      data() {
            return {

                  secim: "messages",
                  Username: "Test",
                  baseUrl: "http://localhost:3001",
            };
      },

      mounted() {
            this.getUsername()
      },

      watch: {
      },

      computed: {
      },

      methods: {
            async getUsername() {
                  const id = sessionStorage.getItem("userId");

                  try {
                        const res = await fetch(`${this.baseUrl}/api/getUsername`, { // istekte bulunduğumuz yer.
                              method: "POST",
                              headers: {
                                    "Content-type": "application/json"
                              },
                              body: JSON.stringify({
                                    id: id
                              })
                        });
                        if (!res.ok) throw new Error(res.error);
                        const data = await res.json();
                        if (data) alert(data)
                        if (data) this.Username = data
                  }
                  catch (e) {
                        console.log(e);
                  }
            },

            logout() {
                  sessionStorage.removeItem("isLoggedIn")
                  sessionStorage.removeItem("role")
                  sessionStorage.removeItem("userId")
                  router.push("/")
            }

      }
};
</script>
<style scoped>
.admin-content {
      margin-left: 200px;
      padding: 20px;
      width: calc(100% - 200px);
      box-sizing: border-box;
}

#offcanvasExample {
      height: calc(100vh - 120px) !important;
      max-height: none !important;
}
</style>