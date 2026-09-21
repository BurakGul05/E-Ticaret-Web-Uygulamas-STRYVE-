<template>

      <body class="bg-body-tertiary">
            <div class="container">
                  <main>
                        <div class="py-5 text-center">
                              <h1 style="color: chartreuse;">Ödeme Sayfası</h1>
                        </div>
                        <div class="row g-5">
                              <!-- !Sepet Kısmı -->
                              <div class="col-md-5 col-lg-4 order-md-last">
                                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                                          <span class="text">Sepet</span>
                                          <span class="text">{{ sepet.length }} ürün mevcut</span>
                                    </h4>
                                    <ul class="list-group mb-3">
                                          <li class="list-group-item d-flex justify-content-between lh-sm">
                                                <div>
                                                      <!-- !2:57:42 -->
                                                      <h6 class="my-0">Ürün Adı</h6>
                                                </div>
                                                <h6 class="text-body-secondary">Fiyat(₺)</h6>
                                          </li>
                                          <!-- !sepeti döndürücez -->
                                          <li v-for="value, index in sepet"
                                                class="list-group-item d-flex justify-content-between lh-sm">
                                                <div>
                                                      <h6 class="my-0">{{ value.name }}</h6>
                                                      <!-- <small class="text-body-secondary">Ürün Eklendi</small> -->
                                                </div>
                                                <span class="text-body-secondary">
                                                      {{ value.price }}₺
                                                      <div class="col-1">
                                                            <i style="cursor: pointer;" @click.self="deleteItem(index)"
                                                                  class="bi bi-trash3"></i>
                                                      </div>
                                                </span>
                                          </li>
                                          <li class="list-group-item d-flex justify-content-between">
                                                <span>KDV Tutar:</span> <strong>{{ Math.round(toplamTutar * 0.2 * 100) /
                                                      100 }}
                                                      ₺</strong>
                                          </li>
                                          <li class="list-group-item d-flex justify-content-between">
                                                <span>Toplam Tutar:</span> <strong>{{ Math.round(toplamTutar * 1.2 *
                                                      100) / 100 }}
                                                      ₺</strong>
                                          </li>
                                    </ul>
                              </div>
                              <!-- !Form Kısmı -->
                              <div class="col-md-7 col-lg-8">
                                    <h4 class="mb-3">Sipariş Bilgileri</h4>
                                    <form class="needs-validation" @submit.prevent="checkOut()">
                                          <div class="row g-3">
                                                <div class="col-sm-12">
                                                      <label class="form-label">T.C. Kimlik No</label>
                                                      <input type="text" class="form-control"
                                                            placeholder="Fatura için gereklidir." v-model="order[0].TC"
                                                            required />
                                                </div>
                                                <div class="col-sm-6">
                                                      <label class="form-label">Ad</label>
                                                      <input type="text" class="form-control" placeholder=""
                                                            v-model="order[0].firstName" required />
                                                </div>
                                                <div class="col-sm-6">
                                                      <label class="form-label">Soyad</label>
                                                      <input type="text" class="form-control" placeholder=""
                                                            v-model="order[0].lastName" required />
                                                </div>
                                                <div class="col-6">
                                                      <label class="form-label">Email</label>
                                                      <input type="email" class="form-control" v-model="order[0].email"
                                                            placeholder="ornek@example.com" />
                                                </div>
                                                <div class="col-6">
                                                      <label class="form-label">Telefon</label>
                                                      <input type="text" class="form-control" v-model="order[0].phone"
                                                            placeholder="5XXXXXXXXX" />
                                                </div>
                                                <div class="col-12">
                                                      <label class="form-label">Adres</label>
                                                      <textarea class="form-control" v-model="order[0].address"
                                                            placeholder="Mahalle,sokak,apartman bilgileri"
                                                            required></textarea>
                                                </div>
                                                <div class="col-md-5">
                                                      <label class="form-label">Ülke</label>
                                                      <select v-model="order[0].country" class="form-select" required>
                                                            <option value="Turkiye">Turkiye</option>
                                                            <option value="ABD">ABD</option>
                                                      </select>
                                                </div>
                                                <div class="col-md-4">
                                                      <label class="form-label">Şehir</label>
                                                      <select v-model="order[0].state" class="form-select" required>
                                                            <option value="Istanbul" selected>Istanbul</option>
                                                            <option value="Ankara">Ankara</option>
                                                            <option value="Izmir">Izmir</option>
                                                      </select>
                                                </div>
                                                <div class="col-md-3">
                                                      <label class="form-label">Posta Kodu</label>
                                                      <input type="text" class="form-control" v-model="order[0].zip"
                                                            placeholder="" required />
                                                      <div class="invalid-feedback">Zip code required.</div>
                                                </div>
                                          </div>
                                          <hr class="my-4" />
                                          <div class="form-check">
                                                <input type="checkbox" class="form-check-input" />
                                                <label class="form-check-label">Sipariş adresim ile fatura adresim
                                                      aynı</label>
                                          </div>
                                          <div class="form-check">
                                                <input type="checkbox" class="form-check-input" />
                                                <label class="form-check-label">Bilgilerimi sonraki siparişlerim için
                                                      kaydet</label>
                                          </div>
                                          <hr class="my-4" />
                                          <!--! Kart Bilgileri  -->
                                          <h4 class="mb-3">Ödeme Bilgileri</h4>
                                          <div class="row gy-3">
                                                <div class="col-md-6">
                                                      <label class="form-label">Kart Sahibi</label>
                                                      <input v-model="payment[0].name" type="text" class="form-control"
                                                            placeholder="Kartın üzerindeki ismi eksiksiz girin."
                                                            required />
                                                      <small class="text-body-secondary">Kartın üzerindeki ismi eksiksiz
                                                            girin.</small>
                                                </div>
                                                <div class="col-md-6">
                                                      <label class="form-label">Kart Numarası</label>
                                                      <input v-model="payment[0].number" type="text"
                                                            class="form-control" placeholder="" required />
                                                </div>
                                                <div class="col-md-3">
                                                      <label class="form-label">Son Kullanma Tarihi</label>
                                                      <input type="text" v-model="payment[0].exp" class="form-control"
                                                            placeholder="" required />
                                                </div>
                                                <div class="col-md-3">
                                                      <label class="form-label">CVV</label>
                                                      <input type="text" v-model="payment[0].cvv" class="form-control"
                                                            placeholder="" required />
                                                </div>
                                          </div>
                                          <hr class="my-4" />
                                          <button class="w-100 btn btn-primary btn-lg" type="submit">
                                                Siparişi Tamamla
                                          </button>
                                          {{ order }}
                                          <hr>
                                          {{ sepet }}
                                          <hr>
                                          {{ payment }}


                                    </form>
                              </div>
                        </div>
                  </main>
                  <footer class="my-5 pt-5 text-body-secondary text-center text-small">
                        <p class="mb-1">&copy; 2017–2025 Company Name</p>
                        <ul class="list-inline">
                              <li class="list-inline-item"><a href="#">Privacy</a></li>
                              <li class="list-inline-item"><a href="#">Terms</a></li>
                              <li class="list-inline-item"><a href="#">Support</a></li>
                        </ul>
                  </footer>
            </div>
      </body>
</template>
<script>
export default {
      inject: ['sepet'],
      data() {
            return {
                  baseUrl: "http://localhost:3001",
                  toplam: 0,
                  order: [{ TC: "", firstName: "", lastName: "", email: "", phone: "", address: "", country: "Turkiye", state: "Istanbul", zip: "" }],

                  payment: [{ name: "", number: "", exp: "", cvv: "" }],

            };
      },
      mounted() {


      },
      computed: {
            toplamTutar() {
                  this.toplam = this.sepet.reduce(
                        (toplam, urun) => toplam + urun.price, 0
                  )
                  return Math.round(this.toplam * 100) / 100
            }
      },
      methods: {
            async checkOut() {
                  try {

                        const res = await fetch(`${this.baseUrl}/api/orders`, {
                              method: "POST",
                              headers: {
                                    "Content-Type": "application/json"
                              },
                              body: JSON.stringify({
                                    sepet: this.sepet,
                                    order: this.order,
                                    amount: Math.round(this.toplam * 1.2)
                              })
                        });
                        if (!res.ok) throw new Error("Order endpoint hatası");
                        const data = await res.json();
                        if (data) alert("Siparis Alindi");

                  }
                  catch (e) {
                        console.log(e.message);
                  }
            },

            deleteItem(index) {
                  this.sepet.splice(index, 1);
            },
      },
};
</script>
<style scoped>
body {
      color: white;
}

.bd-placeholder-img {
      font-size: 1.125rem;
      text-anchor: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
}

@media (min-width: 768px) {
      .bd-placeholder-img-lg {
            font-size: 3.5rem;
      }
}

.b-example-divider {
      width: 100%;
      height: 3rem;
      background-color: #0000001a;
      border: solid rgba(0, 0, 0, 0.15);
      border-width: 1px 0;
      box-shadow:
            inset 0 0.5em 1.5em #0000001a,
            inset 0 0.125em 0.5em #00000026;
}

.b-example-vr {
      flex-shrink: 0;
      width: 1.5rem;
      height: 100vh;
}

.bi {
      vertical-align: -0.125em;
      fill: currentColor;
}

.nav-scroller {
      position: relative;
      z-index: 2;
      height: 2.75rem;
      overflow-y: hidden;
}

.nav-scroller .nav {
      display: flex;
      flex-wrap: nowrap;
      padding-bottom: 1rem;
      margin-top: -1px;
      overflow-x: auto;
      text-align: center;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
}

.btn-bd-primary {
      --bd-violet-bg: #010008;
      --bd-violet-rgb: 112.520718, 44.062154, 249.437846;
      --bs-btn-font-weight: 600;
      --bs-btn-color: var(--bs-white);
      --bs-btn-bg: var(--bd-violet-bg);
      --bs-btn-border-color: var(--bd-violet-bg);
      --bs-btn-hover-color: var(--bs-white);
      --bs-btn-hover-bg: #6528e0;
      --bs-btn-hover-border-color: #6528e0;
      --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
      --bs-btn-active-color: var(--bs-btn-hover-color);
      --bs-btn-active-bg: #5a23c8;
      --bs-btn-active-border-color: #5a23c8;
}

.bd-mode-toggle {
      z-index: 1500;
}

.bd-mode-toggle .bi {
      width: 1em;
      height: 1em;
}

.bd-mode-toggle .dropdown-menu .active .bi {
      display: block !important;
}
</style>