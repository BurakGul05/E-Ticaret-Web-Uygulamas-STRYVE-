<template>
      <!-- !Sepet Sidebar  -->
      <!-- <a data-bs-toggle="offcanvas" href="#sepetsidebar">
            <i class="bi bi-cart-fill fs-2 " style="color: red;"></i>
      </a> -->

      <a data-bs-toggle="offcanvas" href="#sepetsidebar"
            style="position: fixed; right: 20px; top: 500px; z-index: 10000;">
            <i class="bi bi-cart-fill fs-2" style="color: red;"></i>
      </a>

      <div class="offcanvas offcanvas-end" tabindex="-1" id="sepetsidebar">
            <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasExampleLabel">Sepet</h5>
                  <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                  <div class="row mb-3">
                        <div class="col-8"><b>Ürün Adı</b></div>
                        <div class="col-4"><b>Fiyat</b></div>
                  </div>
                  <div class="row" v-for="value, index in sepet">
                        <div class="col-8">{{ value.name }}</div>
                        <div class="col-2 ">{{ value.price }}</div>
                        <div class="col-2">
                              <i style="cursor: pointer;" @click="deleteItem(index)" class="bi bi-x-lg"></i>
                        </div>

                  </div>



                  <div class="row mt-3">
                        <div class="col-8"><b>Toplam Tutar:</b></div>

                        <div class="col-4">{{ toplamTutar }} </div>
                        <div class="row mt-3 mb-3">
                              <button class="btn btn-success w-100" @click="Checkout()">Odeme Sayfasina Gec
                              </button>
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
                  toplam: 0
            };
      },
      mounted() {

      },

      watch: {
      },

      computed: {
            toplamTutar() {
                  this.toplam = this.sepet.reduce((toplam, item) => toplam + Number(item.price) * Number(item.quantity), 0);
                  return Math.round(this.toplam * 100) / 100

            }
      },

      methods: {
            Checkout() {
                  // this.$router.push('/checkout')
                  document.getElementById("sepetsidebar").classList.remove("show");

                  const backdrop = document.querySelector(".offcanvas-backdrop");
                  if (backdrop) {
                        backdrop.remove();
                  }
                  document.body.style.overflow = "auto";

                  this.$router.push('/checkout');
            },
            deleteItem(index) {
                  this.sepet.splice(index, 1);

            },
      }
};
</script>
<style scoped></style>