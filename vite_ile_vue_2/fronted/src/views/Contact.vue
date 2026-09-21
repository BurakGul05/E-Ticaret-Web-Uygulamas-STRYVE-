<template>
      <!-- !CONTACT ICERIK -->
      <div class="content">
            <h1>Bize Mesaj Gönderin!</h1>


            <div class="form-card">
                  <h2>ILETISIM FORMU</h2>
                  <!--!  CONTACT FORM ALANI -->
                  <form @submit.prevent="sendMessage()">
                        <div class="form-group">
                              <label class="form-label">AD </label>
                              <input v-model="newMessage[0].firstName" type="text" class="form-control"
                                    placeholder="Adinizi Giriniz" required>

                              <div v-if="firstNameError" class="alert alert-warning mt-2">
                                    <small style="color: red;">{{ firstNameError }}</small>

                              </div>


                        </div>
                        <div class="form-group">
                              <label> SOYAD</label>
                              <input v-model="newMessage[0].lastName" type="text" class="form-control"
                                    placeholder=" Soyadınızı Giriniz" required>

                              <div v-if="lastNameError" class="alert alert-warning mt-2">
                                    <small style="color: red;">{{ lastNameError }}</small>

                              </div>
                        </div>
                        <div class="form-group">
                              <label>E-MAİL</label>
                              <input v-model="newMessage[0].email" type="text" class="form-control"
                                    placeholder="example@hotmail.com" required>

                              <div v-if="emailError" class="alert alert-warning mt-2">
                                    <small style="color: red;">{{ emailError }}</small>

                              </div>

                        </div>

                        <div class="form-group">
                              <label>ÜLKE</label>
                              <select v-model="newMessage[0].code" required>
                                    <option value="+90" selected>TR (+90)</option>
                                    <option value="+971">BAE (+971)</option>
                                    <option value="+34">ES (+34)</option>
                              </select>

                        </div>

                        <div class="form-group">
                              <label>TELEFON</label>
                              <input v-model="newMessage[0].phone" type="text" class="form-control" required>
                              <div v-if="phoneError" class="alert alert-warning mt-2">
                                    <small style="color: red;">{{ phoneError }}</small>
                              </div>

                        </div>

                        <div class="form-group">
                              <label>MESAJ İÇERİĞİ</label>
                              <select v-model="newMessage[0].subject" required>
                                    <option value="Tesekkur ">Tesekkur</option>
                                    <option value="Oneri">Oneri</option>
                                    <option value="Sikayet">Sikayet</option>
                              </select>
                              <br><br>
                              <textarea v-model="newMessage[0].message" class="form-control" placeholder="MESAJ"
                                    required></textarea>
                        </div>

                        <div class="check-group">
                              <input v-model="newMessage[0].check" type="checkbox" required>
                              <label for="c">Paylaştığım verilerin işlenmesini ve saklanmasını kabul ediyorum.</label>

                        </div>
                        <div v-if="status != 'isleniyor'">
                              <button type="submit" class="btn btn-primary">GÖNDER</button>
                        </div>


                        <!-- !MESAJ STATUS -->
                        <div class="row">

                              <!-- ?GONDERILDIYSE -->
                              <div v-if="status == 'basarili'"
                                    class="alert alert-success alert-dismissible fade show mt-3 " role="alert">
                                    MESAJ BASARIYLA GONDERILDI✅
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    </button>
                              </div>

                              <!-- ?GONDERILMEDIYSE -->
                              <div v-if="status == 'basarisiz'"
                                    class="alert alert-danger alert-dismissible fade show mt-3 " role="alert">
                                    MESAJ GONDERILEMEDI❌
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    </button>
                              </div>

                        </div>

                  </form>
            </div>
      </div>





</template>


<script>
import { validateFirstName, validateLastName, validateEmail, validatePhone } from '@/validation.js';

export default {
      data() {
            return {
                  newMessage: [
                        { firstName: "", lastName: "", email: "", code: "+90", phone: "", subject: "Tesekkur", message: "", check: false, }
                  ],

                  status: "",
                  firstNameError: "",
                  lastNameError: "",
                  emailError: "",
                  phoneError: "",

                  messages: [],
                  baseUrl: "http://localhost:3001"
            };
      },
      mounted() {

      },

      unmounted() {

      },

      watch: {
      },
      computed: {
      },
      methods: {

            // POST- MESAJ GONDER
            async sendMessage() {
                  try {
                        this.status = "isleniyor";
                        this.firstNameError = "";
                        this.lastNameError = "";
                        this.emailError = "";
                        this.phoneError = "";

                        this.firstNameError = validateFirstName(this.newMessage[0].firstName);
                        this.lastNameError = validateLastName(this.newMessage[0].lastName);
                        this.emailError = validateEmail(this.newMessage[0].email);
                        this.phoneError = validatePhone(this.newMessage[0].phone);

                        if (
                              this.firstNameError ||
                              this.lastNameError ||
                              this.emailError ||
                              this.phoneError
                        ) {
                              this.status = "";
                              return;
                        }

                        const res = await fetch(`${this.baseUrl}/api/contact`, {
                              method: "POST",
                              headers: {
                                    "Content-Type": "application/json"
                              },
                              body: JSON.stringify({

                                    firstName: this.newMessage[0].firstName,
                                    lastName: this.newMessage[0].lastName,
                                    email: this.newMessage[0].email,
                                    code: this.newMessage[0].code,
                                    phone: this.newMessage[0].phone,
                                    subject: this.newMessage[0].subject,
                                    message: this.newMessage[0].message,
                              })
                        });

                        const data = await res.json();

                        if (!res.ok) {
                              throw new Error(data);
                        }

                        this.status = "basarili"; //!burada normalde this.status= data yaziyordu ama hata aldigim icin bsarili yaptim contact sayfasinda mesaj gonderdikten sonra ekrana mesaj gonderildi bildirimi verebilmek icin

                        this.newMessage[0].firstName = "";
                        this.newMessage[0].lastName = "";
                        this.newMessage[0].email = "";
                        this.newMessage[0].code = "+90";
                        this.newMessage[0].phone = "";
                        this.newMessage[0].subject = "Tesekkur";
                        this.newMessage[0].message = "";
                        this.newMessage[0].check = false;
                  }
                  catch (e) {
                        this.status = "Mesaj Gonderilemedi";
                        console.log(e.message);
                  }
            },
      }
};
</script>


<style scoped></style>