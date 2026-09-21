<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Sepet from '@/components/sepet.vue'
import { reactive } from "vue"
import { Modal } from 'bootstrap'
</script>


<!-- !BODY KISMIMIZ -->
<template>


    <!-- ! SITEDE OLMASI GEREKEN MENU CUBUGU -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <img style="height: 100px; width: 130px;" src="../src/assets/img/logo.png" alt="">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink class="nav-link" aria-current="page" to="/">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/about">About</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/faq">FAQ</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/product">Product</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/contact">Contact</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/test">Test</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/admin">Admin</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/test2">Test2</RouterLink>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#girisModal"
                            style="margin-left: 10px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black"
                                class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path fill-rule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                            </svg>
                        </a>
                    </li>

                    <li class="nav-item" @click="pageRouter()">
                        <a style="cursor: pointer;" class="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black"
                                class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path fill-rule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                            </svg>
                        </a>
                    </li>



















                    <form class="form-inline my-2 my-lg-0" @submit.prevent>
                        <input @keyup.enter="search()" v-model="nav_search" class="form-control mr-sm-2" type="search"
                            placeholder="Search" aria-label="Search">
                        <button @click="search()" class="btn btn-primary" type="button">Search</button>
                    </form>
                </ul>
            </div>
        </div>
    </nav>

    <!-- <div class="container">
    <div class="sepetsidebar">
      <Sepet />
    </div> -->


    <Sepet />

    <div class="container">

        <!--! <header class="ust-header">
      <nav class="navigasyon">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="sss.html">S.S.S</a>
        <a href="products.html">Products</a>
        <a href="contact.html">Contact Us</a>

        
        <a href="#" data-bs-toggle="modal" data-bs-target="#girisModal" style="margin-left: 10px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-person-circle"
            viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
          </svg>
        </a>
      </nav>
    </header> -->

        <!--! SAYFA ORTASINDAKİ BAŞLIK -->
        <main class="container text-center" style="margin-top: 150px;">
            <h1 style=" color: chocolate;">Gücünü Keşfet, Hedefine Ulaş.</h1>
            <p class="" style="color: #171717; font-size: 25px;">Antrenmanlarını bir üst seviyeye taşımak için ihtiyacın
                olan spor giyim, ekipman ve aksesuarları tek yerde bul. Kaliteli ürünler, modern tasarımlar ve
                performans odaklı seçeneklerle hedeflerine daha güçlü adımlarla ilerle.

                Sen hedefini belirle, biz ekipmanını tamamlayalım.</p>
        </main>

        <!-- !1. PENCERE: GİRİŞ YAP  -->
        <div class="modal fade" id="girisModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <h4 id="examplemodallabel" class="modal-title" style="font-weight: bold;">Giriş Yap</h4>
                        <button id="loginClose" type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>


                    <!-- !LOGIN MODAL -->
                    <div class="modal-body">
                        <!--!login Form  -->
                        <form @submit.prevent="submitLogin()">
                            <div class="mb-3 text-start">
                                <label class="form-label">Email*</label>
                                <input type="text" class="form-control" v-model="user[0].email"
                                    placeholder="Email adresinizi giriniz" required>

                                <div v-if="emailError" style="color: red;">
                                    <small style="color: red;">{{ emailError }}</small>
                                </div>

                            </div>

                            <div class="mb-3 text-start">
                                <label class="form-label">Parola*</label>
                                <input type="password" class="form-control" v-model="user[0].pass"
                                    placeholder="Parolanızı giriniz" required>

                                <div v-if="passError" style="color: red;">
                                    <small style="color: red;">{{ passError }}</small>
                                </div>

                            </div>
                            <div class="mb-3 form-check text-start">
                                <input type="checkbox" class="form-check-input" v-model="user[0].check">
                                <label @click.self="user[0].check = !user[0].check" style="cursor: pointer;"
                                    class="form-check-label">Gercekten Robot Degilim</label>
                                <!-- !clickself ekleyerek yazinin ustune tikladiginda da checkboxin isaretlenmesini sagladim (@click.self="user[0].check =!user[0].check") bu kisim ile -->

                                <div v-if="checkError" style="color: red;">
                                    <small style="color: red;">{{ checkError }}</small>
                                </div>

                            </div>
                            <!--! UYARI ALERT KISMI -->
                            <!-- <div style="display: none;" id="uyari_div" class="alert alert-warning alert-dismissible fade show"
                role="alert">
                <small id="uyari_metni">Uyari Metni.</small>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div> -->

                            <button id="login_button" type="submit" class="btn btn-primary w-100"
                                style="padding: 12px; font-weight: bold;">Giriş Yap</button>
                        </form>

                        <!--! Sifre Yenileme Formu -->
                        <!-- <form style="display: none;" id="reset_form" onsubmit="return false">
              <div class="mb-3 text-start">
                <label class="form-label">E-mail*</label>
                <input type="email" class="form-control" id="reset_email" placeholder="Email adresinizi giriniz"
                  required>
              </div>

              <button type="submit" class="btn btn-primary w-100" style="padding: 12px; font-weight: bold;"
                onclick="reset_pass()">Sifre Yenileme Baglantisi Gonder</button>
            </form> -->

                    </div>

                    <div class="modal-footer border-0 justify-content-start">
                        <!--! BURASI ÖNEMLİ: Tıklanınca REGISTERMODALI açar -->
                        <a id="LoginLink" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#kayitModal"
                            style="color: #0d6efd; text-decoration: underline; font-size: 14px;">Hesabın yoksa kayıt
                            olmak
                            için tıkla</a>
                    </div>

                </div>
            </div>
        </div>

        <!--! REGISTER MODAL -->
        <div class="modal fade" id="kayitModal" tabindex="-1" aria-hidden="true">

            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <h4 class="modal-title" style="font-weight: bold;">Kayıt Ol</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Kapat"></button>
                    </div>
                    <!-- !Register Form -->
                    <div class="modal-body">
                        <form @submit.prevent="submitRegister()">
                            <div class="row">
                                <div class="col-md-6 mb-3 text-start">
                                    <label class="form-label">Ad*</label>
                                    <input type="text" class="form-control" v-model="user[0].firstName">

                                    <div v-if="firstNameError" style="color:red;">
                                        <small>{{ firstNameError }}</small>
                                    </div>

                                    <div>

                                    </div>
                                </div>
                                <div class="col-md-6 mb-3 text-start">
                                    <label class="form-label">Soyad*</label>
                                    <input type="text" class="form-control" v-model="user[0].lastName">
                                    <div v-if="lastNameError" style="color:red;">
                                        <small>{{ lastNameError }}</small>
                                    </div>

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3 text-start">
                                    <label class="form-label">Email*</label>
                                    <input type="text" class="form-control" v-model="user[0].email"
                                        placeholder="example@hotmail.com">
                                    <div v-if="emailError" style="color:red;">
                                        <small>{{ emailError }}</small>
                                    </div>

                                </div>
                                <div class="col-md-6 mb-3 text-start">
                                    <label class="form-label">Telefon*</label>
                                    <input type="text" class="form-control" v-model="user[0].phone"
                                        placeholder="5xxxxxxxxx">

                                    <div v-if="phoneError" style="color:red;">
                                        <small>{{ phoneError }}</small>
                                    </div>

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3 text-start">
                                    <label class="form-label">Parola*</label>
                                    <input type="password" class="form-control" v-model="user[0].pass">

                                    <div v-if="passError" style="color:red;">
                                        <small>{{ passError }}</small>
                                    </div>

                                </div>
                                <div class="col-md-6 mb-3 text-start">
                                    <label class="form-label">Parola Tekrar*</label>
                                    <input type="password" class="form-control" v-model="user[0].repeatPass">

                                    <div v-if="repeatPassError" style="color:red;">
                                        <small>{{ repeatPassError }}</small>
                                    </div>

                                </div>
                                <div class="col-md-12 mb-3 text-start">
                                    <label class="form-label">Doğum Tarihi*</label>
                                    <input type="date" class="form-control" v-model="user[0].birthdate">

                                    <div v-if="repeatPassError" style="color:red;">
                                        <small>{{ repeatPassError }}</small>
                                    </div>

                                </div>

                            </div>
                            <div class="mb-3 form-check text-start">
                                <input type="checkbox" v-model="user[0].check" class="form-check-input">

                                <label @click.self="user[0].check = !user[0].check" style="cursor: pointer;"
                                    class="form-check-label" for="checkOnay">Bilgilerimin dogruluğunu
                                    onayliyorum.</label>

                                <div v-if="checkError" style="color:red;">
                                    <small>{{ checkError }}</small>
                                </div>

                            </div>
                            <button type="submit" class="btn btn-primary w-100"
                                style="padding: 12px; font-weight: bold;">Kayıt
                                Ol</button>
                        </form>
                    </div>
                    <div class="modal-footer border-0 justify-content-start">
                        <!-- <a id="loginLink" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#girisModal"
                            style="color: #0d6efd; text-decoration: underline; font-size: 14px;"> Giris
                            yapmak
                            icin tikla</a> -->

                        <a href="" id="loginLink" class="navlink" data-bs-toggle="modal"
                            data-bs-target="#girisModal">Giriş yapmak için
                            tıklayın.</a>





                    </div>
                </div>
            </div>

        </div>

    </div>

    <RouterView />



</template>
<script>
// import { Modal } from 'bootstrap'
import {
    validateEmail, validatePassword, validateCheck, validateFirstName, validateLastName, validatePhone, validateRepeatPassword
} from '@/validation.js';

export default {
    data() {
        return {
            baseUrl: "http://localhost:3001",
            nav_search: "",
            user: [
                {
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    pass: "",
                    repeatPass: "",
                    birthdate: "",
                    check: false,
                }
            ],
            login: [
                {
                    email: "",
                    pass: "",
                    check: false,
                }
            ],
            emailError: "",
            passError: "",
            checkError: "",
            firstNameError: "",
            lastNameError: "",
            phoneError: "",
            repeatPassError: "",

            users: [],
            //user: "", 

            sepet: reactive([
                // { name: "aaa", stock: 40, price: 100 },
                // { name: "bbb", stock: 40, price: 200 },
                // { name: "ccc", stock: 40, price: 300 },
                // { name: "ddd", stock: 40, price: 400 },

            ])
        };
    },

    mounted() {

    },
    provide() {//!  Sepet verisini tüm alt componentlerin ortak kullanabilmesi için paylaşır.
        return {
            sepet: this.sepet //this.sepet verisini alt componentlere gönderir. Böylece tüm sayfalar aynı sepet bilgisini kullanabilir.
        }
    },

    watch: {
    },

    computed: {
    },

    methods:
    {
        pageRouter() {
            console.log("pagerouter geldi");
            if (sessionStorage.getItem("role") == 0 && sessionStorage.getItem("isLoggedIn") == "true") {
                console.log("user geldi")
                router.push("/user")
            }
            else if (sessionStorage.getItem("role") == 1 && sessionStorage.getItem("isLoggedIn") == "true") {
                console.log("admin geldi")

                router.push("/admin")
            }
            else {

                console.log("login yok")
                // document.getElementById("loginModal").className="modal fade show";
                // document.getElementById("loginModal").style.display="block";
                const loginModalElement = document.getElementById("girisModal");
                const loginModal = new Modal(loginModalElement);
                loginModal.show();
            }
        },

        // async submitLogin() {
        //     this.emailError = "";
        //     this.passError = "";
        //     this.checkError = "";

        //     this.emailError = validateEmail(this.user[0].email);
        //     this.passError = validatePassword(this.user[0].pass);
        //     this.checkError = validateCheck(this.user[0].check);


        //     if (this.emailError || this.passError || this.checkError) {
        //         return;
        //     }


        //     try {
        //         const response = await fetch("http://localhost:3001/api/login");

        //         const data = await response.json();

        //         this.user = data.find(
        //             u => u.email == this.user[0].email && u.pass == this.user[0].pass
        //         );

        //         if (this.user) {
        //             alert("Hos Geldin 🙌 " + this.user.firstName);
        //             this.$router.push('/admin');
        //         }
        //         else {
        //             alert("Giris Basarisiz!❌");
        //         }

        //     } catch (error) {
        //         alert("Kullanici Eklenmedi! ❌");
        //     }

        // },


        //Burası geliştirilecek.
        loginValidation() {
            if (this.user[0].check)
                return true
            else
                return false
        },

        async submitLogin() {
            if (this.loginValidation()) {
                try {
                    const res = await fetch(`${this.baseUrl}/api/login`, {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            email: this.user[0].email,
                            pass: this.user[0].pass,
                        })
                    });
                    if (!res.ok) throw new Error("Login endpoint hatasi");
                    const data = await res.json();
                    if (data)
                        alert("Giriş Başarili.Hosgeldin " + data[0].u_firstName)

                    sessionStorage.setItem("isLoggedIn", true);
                    sessionStorage.setItem("role", data[0].u_role);
                    sessionStorage.setItem("userId", data[0].u_id);

                    if (data[0].u_role == 1)
                        this.$router.push("/admin");
                    else
                        this.$router.push("/product")

                    this.user[0].email = "";
                    this.user[0].pass = "";
                    this.user[0].check = false;

                    document.getElementById('loginClose')?.click()




                }
                catch (e) {
                    //console.log = e.message
                    alert("Giris Basarisiz")
                }
            }
            else {
                alert("Veriler Yanlis");
            }
        },

        async submitRegister() {

            this.firstNameError = "";
            this.lastNameError = "";
            this.emailError = "";
            this.phoneError = "";
            this.passError = "";
            this.repeatPassError = "";
            this.checkError = "";

            this.firstNameError = validateFirstName(this.user[0].firstName);
            this.lastNameError = validateLastName(this.user[0].lastName);
            this.emailError = validateEmail(this.user[0].email);
            this.phoneError = validatePhone(this.user[0].phone);
            this.passError = validatePassword(this.user[0].pass);
            this.repeatPassError = validateRepeatPassword(this.user[0].pass, this.user[0].repeatPass);
            this.checkError = validateCheck(this.user[0].check);

            if (
                this.firstNameError ||
                this.lastNameError ||
                this.emailError ||
                this.phoneError ||
                this.passError ||
                this.repeatPassError ||
                this.checkError
            ) {
                return;
            }

            try {
                const response = await fetch("http://localhost:3001/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        this.user[0]
                    )
                    /*body: JSON.stringify(
                        firstName=this.user[0].firstName,
                        lastName=this.user[0].lastName,
                        email=this.user[0].email,
                        phone=this.user[0].phone,
                        pass=this.user[0].pass,
                    )*/
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Kayit Basarili!✅");

                } else {
                    alert(data);
                }
                document.getElementById('loginLink')?.click()

            } catch (error) {
                alert("Kayit Yapilmadi! ❌");
            }
        },


        search() {
            alert("Arama Yapiliyor..." + this.nav_search)
            this.nav_search = "" //entera ya da searcha basildigi zaman ekrani temizliyor
        },

    }
};
</script>

<!-- !BU SAYFAYA OZEL CSS UYGULAYCAKSAN scopede yazmamiz gerekiyor -->
<!-- !scoped yazmazsak buradaki css ler her sayfa da gecerli olur -->
<style scoped>
/* ============================= */
/* ANA BAŞLIK */
/* ============================= */

main {
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 20px;
    padding-right: 20px;
}

/* Başlık ekran boyutuna göre küçülüp büyür */
main h1 {
    font-size: clamp(32px, 50vw, 100px) !important;
    line-height: 1.2;
    word-wrap:break-word;
    
}


/* ============================= */
/* TABLET */
/* ============================= */

@media (max-width: 991px) {

    main {
        margin-top: 100px !important;
    }

    main h1 {
        font-size: clamp(30px, 6vw, 50px) !important;
    }

}


/* ============================= */
/* TELEFON */
/* ============================= */

@media (max-width: 576px) {

    main {
        margin-top: 70px !important;
        padding-left: 15px;
        padding-right: 15px;
    }

    main h1 {
        font-size: clamp(28px, 9vw, 42px) !important;
        line-height: 1.2;
    }

}


/* ============================= */
/* ÇOK KÜÇÜK TELEFON */
/* ============================= */

@media (max-width: 400px) {

    main {
        margin-top: 50px !important;
    }

    main h1 {
        font-size: 28px !important;
    }

}


/* ============================= */
/* NAVBAR LOGOSU */
/* ============================= */

nav img {
    max-width: 100%;
    height: auto !important;
    object-fit: cover;
}


/* ============================= */
/* NAVBAR */
/* ============================= */

nav .container-fluid {
    width: 100%;
}


/* ============================= */
/* SEARCH */
/* ============================= */

nav form {
    max-width: 100%;
}

nav form input {
    max-width: 100%;
}


/* ============================= */
/* MODAL */
/* ============================= */

.modal-dialog {
    max-width: 95%;
    margin-left: auto;
    margin-right: auto;
}


/* Telefon ekranında modal biraz daha dar olsun */

@media (max-width: 576px) {

    .modal-dialog {
        max-width: 95%;
    }

    .modal-content {
        width: 100%;
    }

}
</style>
