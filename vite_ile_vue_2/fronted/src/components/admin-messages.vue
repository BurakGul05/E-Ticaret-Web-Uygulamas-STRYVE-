<template>
      <h3 style="color: red;">Mesajlar</h3>


      <!-- <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="m-0" style="color: red;">Mesajlar</h3>
            <button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#addmessages">
                   Mesaj Ekle
            </button>
      </div> -->

      <!-- ? table responsive= Bu tablonun ekranı küçüldüğünde taşmasını yönet -->
      <div class="table-responsive">

            <table class="table table-striped">
                  <thead>
                        <tr>
                              <th scope="col">ID</th>
                              <th scope="col">AD-SOYAD:</th>
                              <th scope="col">E-MAİL:</th>
                              <th scope="col">TELEFON:</th>
                              <th scope="col">KONU:</th>
                              <th scope="col">Mesaj:</th>
                              <th scope="col">Tarih:</th>
                              <th scope="col">Durumu:</th>

                              <th scope="col">ISLEM:</th>
                        </tr>

                  </thead>
                  <tbody>

                        <tr v-for="message,index in messages">
                              <th>{{index+1 }}</th>
                              <!-- <td><label> {{ message.m_id }} </label></td> -->
                              <td><label> {{ message.m_firstName }} {{ message.m_lastName }}</label></td>
                              <td><label> {{ message.m_email }} </label></td>
                              <td><label> {{ message.m_code }}{{ message.m_phone }}</label></td>
                              <td><label> {{ message.m_subject }} </label></td>
                              <td><label> {{ message.m_message }} </label></td>
                              <td><label> {{ message.m_created_at.split("T")[0] }}</label></td>

                              <td>
                                    <select :style="message.m_status == 0 ? 'color:red' : 'color:green'" style="cursor: pointer;" class="form-select"
                                          v-model="message.m_status">
                                          <option style= "color:black" value=0>Yanitlanmadi</option>
                                          <option style="color:black" value=1>Yanitlandi</option>
                                    </select>
                              </td>

                              <td class="text-nowrap">
                                    <button class="btn btn-outline-primary btn-sm m-1" @click="updateMessage(message.m_id, message.m_status)">
                                          Guncelle
                                    </button>
                                    <!-- !?HAZIR BOOTSTRAP TEXT NOWRAP= Metni alt satıra geçirme. -->
                                    <a class="btn-sm m-1 btn btn-outline-success" :href="`mailto:${message.m_email}`">
                                          Yanitla
                                    </a>
                                    <!-- !"Yanıtla butonuna basıldığında, mesajı gönderen kişinin e-posta adresini al ve mail uygulamasını o kişiye mail atılacak şekilde aç." -->
                                    <button style="margin-left: 10px;" class="btn-sm btn btn-outline-danger"
                                          @click="deleteMessage(message.m_id)">
                                          Sil
                                    </button>

                              </td>


























                        </tr>
                  </tbody>
            </table>

      </div>

      <!--! Mesaj ekle modal'ı -->
      <!-- <div class="modal fade" id="addmessages" tabindex="-1">
            <div class="modal-dialog">
                  <div class="modal-content">
                        <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel">Mesaj Ekle</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div> 
                         <form @submit.prevent="addMessages()">
                              <div class="modal-body">

                                    <div class="row">
                                          <div class="col-12 mb-3">
                                                <label class="form-label">Ad:</label>
                                                <input type="text" class="form-control"
                                                      v-model="newMessage[0].firstName" required>
                                                <small style="color: red;"> {{ firstNameError }}</small>

                                          </div>

                                          <div class="col-6">
                                                <label class="form-label ">Soyad:</label>
                                                <input type="text" class="form-control mb-2 " min="0"
                                                      v-model="newMessage[0].lastName" required>
                                                <small style="color: red;"> {{ lastNameError }}</small>


                                          </div>
                                          <div class="col-6">
                                                <label class="form-label">E-Mail:</label>
                                                <input type="text" class="form-control" v-model="newMessage[0].email"
                                                      required>
                                                <small style="color: red;"> {{ emailError }}</small>

                                          </div>
                                          <div class="col-md-8">
                                                <label class="form-label">Code:</label>
                                                <select class="form-label" v-model="newMessage[0].code" required>
                                                      <option value="+90" selected>TR (+90)</option>
                                                      <option value="+971">BAE (+971)</option>
                                                      <option value="+34">ES (+34)</option>
                                                </select>
                                          </div>
                                          <div class="col-6">
                                                <label class="form-label">Telefon:</label>
                                                <input type="text" class="form-control" v-model="newMessage[0].tel"
                                                      required>
                                                <small style="color: red;"> {{ telError }}</small>


                                          </div>

                                          <div class="col-6">
                                                <label class="form-label">Tür:</label>
                                                <select class="form-select" v-model="newMessage[0].subject">
                                                      <option value="Hazirlaniyor">Sikayet</option>
                                                      <option value="Kargoya Verildi">Oneri</option>
                                                      <option value="Teslim Edildi">Tesekkur Etme</option>
                                                </select>
                                          </div> 

                                        
                                           <div class="col-12 mt-3">
                                                <label class="form-label">Mesaj:</label>
                                                <textarea class="form-control" rows="4"
                                                      v-model="newMessage[0].message"
                                                      placeholder="Mesajınızı yazınız..." required>
                                                 </textarea>
                                          </div>
                                    </div>
                              </div> 
                               <div class="modal-footer">
                                    <button class="btn btn-primary w-100" type="submit">Gönder</button>
                              </div>
                        </form>
                  </div>
            </div>
      </div> -->

      <!--!  Order Details modal'ı -->
      <!-- <div v-if="orders.length > 0" class="modal fade" id="details" tabindex="-1">
            <div class="modal-dialog">
                  <div class="modal-content">
                        <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel"> Siparis Detaylar</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>

                        <div class="modal-body">
                              <div class="row">

                                    <div class="col-md-4 mb-2 ">
                                          <label class="form-label fw-bold">Siparis No:</label>

                                    </div>

                                    <div class="col-md-8 mb-2 ">
                                          <label class="form-label">{{ orders[detailID].o_no }}</label>
                                    </div>


                                    <div class="col-md-4 mb-2 ">
                                          <label class="form-label fw-bold ">Urunler:</label>

                                    </div>

                                    <div class="col-md-8 mb-2 ">
                                          <label class="form-label">{{ orders[detailID].o_products }}</label>
                                    </div>


                                    <div class="col-md-4 mb-2 ">
                                          <label class="form-label fw-bold">Siparis Veren:</label>

                                    </div>

                                    <div class="col-md-8 mb-2 ">
                                          <label class="form-label ">{{ orders[detailID].o_person }}</label>
                                    </div>


                                    <div class="col-md-4 mb-2 ">
                                          <label class="form-label fw-bold">Siparis Adresi:</label>

                                    </div>

                                    <div class="col-md-8 mb-2 ">
                                          <label class="form-label">{{ orders[detailID].o_address }}</label>
                                    </div>

                                    <div class="col-md-4 mb-2 ">
                                          <label class="form-label fw-bold">Toplam Tutar:</label>

                                    </div>

                                    <div class="col-md-8 mb-2 ">
                                          <label class="form-label">{{ orders[detailID].o_amount }}₺</label>
                                    </div>

                                    <div class="col-md-4 mb-2 ">
                                          <label class="form-label fw-bold">Siparis Tarihi:</label>

                                    </div>

                                    <div class="col-md-8 mb-2">
                                          <label class="form-label">{{ orders[detailID].o_date }}</label>
                                    </div>


                                    <div class="col-md-4 mb-2 ">
                                          <label class="form-label fw-bold"> Durumu:</label>

                                    </div>

                                    <div class="col-md-8 mb-2 ">
                                          <label class="form-label">{{ orders[detailID].o_status }}</label>
                                    </div>

                              </div>


                        </div>

                  </div>
            </div>
      </div> -->

</template>

<!--! Programlama ve fonksiyonların olduğu yer -->
<script>
export default {
      data() {
            return {
                  detailID: 0,
                  messages: [],
                  error: null,
                  baseUrl: "http://localhost:3001",
                  // newMessage: [

                  //       {
                  //             firstName: "",
                  //             lastName: "",
                  //             email: "",
                  //             code: "",
                  //             tel: "",
                  //             subject: "",
                  //             message: ""

                  //       },
                  // ],
                  firstNameError: "",
                  lastNameError: "",
                  emailError: "",
                  telError: "",

            };
      },
      mounted() {
            this.getMessages();
      },



      watch: {


      },

      computed: {
      },

      methods: {

            // MESAJ LISTELE
            async getMessages() {
                  this.error = null;
                  try {
                        const res = await fetch(`${this.baseUrl}/api/messages`);
                        if (!res.ok) throw new Error("Messages endpoint hatasi");
                        this.messages = await res.json();
                  } catch (e) {
                        this.error = e.message;
                  }
            },

              // PUT- Mesaj Guncelleme
            async updateMessage(m_id,m_status) {
                  try {

                        const res = await fetch(`${this.baseUrl}/api/messages/${m_id}`, {


                              method: "PUT",
                              headers: { 

                                    "Content-Type": "application/json" 
                              },
                              body: JSON.stringify({

                                   status:m_status
                              })
                        });
                        if (!res.ok) throw new Error("updateMessage endpoint hatasi");

                        const data = await res.json(); //Backend'in gönderdiği cevabı JSON olarak oku.

                        if (data) {
                              alert(data)
                        }
                        this.getMessages();
                  }
                  catch (e) {
                        console.log(e.message);
                  }
            },

            // MESAJ SIL
            async deleteMessage(m_id) {
                  try {
                        const res = await fetch(`${this.baseUrl}/api/messages/${m_id}`, { //istekte bulunduğumuz yer.
                              method: "DELETE",
                              headers: {
                                    "Content-Type": "application/json",
                              }
                        });
                        if (!res.ok) throw new Error(res.error);
                        const data = await res.json();
                        if (data) alert(data)
                        this.getMessages(); 
                  }
                  catch (error) {
                        console.log(error);
                  }
            },

            //! POST- Mesajlari EKLEME
            // async addMessages() {
            //       try {//!bu kodlari calistirmayi dene eger hata alirsan catche 

            //             this.firstNameError = ""; this.lastNameError = "";
            //             this.emailError = "";
            //             this.telError = "";


            //             //! AD KONTROLU
            //             if (
            //                   this.newMessage[0].firstName.length < 2 ||
            //                   !/^[a-zA-Z]+$/.test(this.newMessage[0].firstName)

            //             ) {
            //                   this.firstNameError = "Ad en az 2 harf  olmalidir";
            //             }


            //             // SOYAD KONTROLU
            //             if (
            //                   this.newMessage[0].lastName.length < 2 ||
            //                   !/^[a-zA-Z]+$/.test(this.newMessage[0].lastName)
            //             ) {
            //                   this.lastNameError = "Soyad en az 2 harf  olmalidir";
            //             }


            //             // EMAIL KONTROLU
            //             if (
            //                   ! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.newMessage[0].email)
            //             ) {
            //                   this.emailError = "E-mail '@' ve '.' icermelidir";
            //             }


            //             // TELEFON KONTROLU
            //             if (
            //                   ! /^[0-9]{10}$/.test(this.newMessage[0].tel)
            //             ) {
            //                   this.telError = "Telefon en az 10 rakam icermelidir";
            //             }

            //             //Herhangi bir hata varsa islemi durdur demek
            //             if (
            //                   this.firstNameError || //!"Ad alanında hata mesajı var mı?"
            //                   this.lastNameError ||
            //                   this.emailError ||
            //                   this.telError
            //             ) {
            //                   return;
            //             }

            //             const res = await fetch(`${this.baseUrl}/api/messages`, {
            //                   method: "POST",
            //                   headers: { //!Başlık / üst bilgi.HTTP isteğinin yanında gönderilen ek bilgilerdir.

            //                         "Content-Type": "application/json" // Content-Type=Gönderdiğim içeriğin türü nedir?
            //                         //application/json=Yani backend'e diyoruz ki:"Ben sana JSON formatında veri gönderiyorum."
            //                         //genel amaci="Sunucuya gönderdiğim verinin JSON şeklinde olduğunu haber verir."

            //                   },
            //                   body: JSON.stringify({//body = asil gonderilen veri demek

            //                         //! Benim ürün bilgilerim newProduct dizisinin içindeki ilk elemanda duruyor."
            //                         // newProduct dizisinin içindeki ilk ürünün bilgilerini alıp,
            //                         // JSON formatına çevirerek backend'e gönderiyoruz.
            //                         firstName: this.newMessage[0].firstName, //Formdaki isim bilgisini al.
            //                         lastName: this.newMessage[0].lastName,//Formdaki stock bilgisini al.
            //                         email: this.newMessage[0].email,
            //                         code: this.newMessage[0].code,
            //                         tel: this.newMessage[0].tel,
            //                         subject: this.newMessage[0].subject,
            //                         message: this.newMessage[0].message,
            //                   })
            //             });
            //             if (!res.ok) throw new Error("addMessages endpoint hatası");
            //             const data = await res.json(); //Backend'in gönderdiği cevabı JSON olarak oku.

            //             this.successMessage = data; //Backend'den gelen mesajı Vue'daki productMessage değişkenine kaydet.sunucu eklendi dedigi zamam gosterir

            //             this.getMessages();// ekledikten sonra birdaha cek demek gerekiyor. her seferinde refresh atmamak icin. Yeni ürün eklendikten sonra backend'deki güncel ürün listesini tekrar çekerek ekranı yeniler.

            //             //Kullanıcı yeni ürün ekledikten sonra eski bilgiler kutularda kalmasın diye giriş alanlarını başlangıç değerlerine döndürür.
            //             this.newMessage[0].firstName = "";
            //             this.newMessage[0].lastName = "";
            //             this.newMessage[0].email = "";
            //             this.newMessage[0].code = "";
            //             this.newMessage[0].tel = "";
            //             this.newMessage[0].subject = "";
            //             this.newMessage[0].message = "";
            //       }
            //       catch (e) {
            //             this.successMessage = e.message;// eger hata alirsa catch calisiyor ve urun ekle butonu altinda urun basariyla eklendi kismina failed yazisi geliyor 
            //       }
            // },


      }
};
</script>
<style scoped></style>