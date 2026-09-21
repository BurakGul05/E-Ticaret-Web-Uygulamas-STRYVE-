<template>
      <h3 style="color: red;">Kullanicilar</h3>
      <button style="float: right;" type="button" class="btn-sm btn btn-outline-success" data-bs-toggle="modal"
            data-bs-target="#adduser">
            Kullanici Ekle
      </button>
      <table class="table table-striped">
            <thead>
                  <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Ad</th>
                        <th scope="col">Soyad</th>
                        <th scope="col">E-Mail</th>
                        <th scope="col">Telefon</th>
                        <th scope="col">Parola</th>
                        <th scope="col">Dogum Tarihi:</th>
                        <th scope="col">Rol:</th>
                        <th scope="col">Islem</th>

                  </tr>
            </thead>
            <tbody>
                  <tr v-for="user, index in users">
                        <th scope="row">{{ index + 1 }}</th>
                        <td><input class="form-control" type="text" v-model="user.u_firstName"></td>
                        <td><input class="form-control" type="text" min="0" v-model="user.u_lastName""></td>
                              <td><input class=" form-control" type="text" v-model="user.u_email"></td>
                        <td><input class=" form-control" type="text" v-model="user.u_phone"></td>
                        <td><input class=" form-control" type="text" v-model="user.u_pass"></td>
                        <!-- <td><input class=" form-control" type="text" v-model="user.u_birthdate"></td> -->
                        <td>{{ new Date(user.u_birthdate).toLocaleDateString() }}</td>
                        <!--! newDate (tarih) nesnesine dönüştürülür. -->
                         <!--! toLocaleDateString()=Date nesnesini yerel tarih formatında gösterir. -->
                        <td>
                              <select v-model="user.u_role" class="form-select">
                                    <option value=0>Kullanici</option>
                                    <option value=1>Admin</option>
                              </select>
                        </td>

                        <td>


                              <div class="text-nowrap">
                                    <button class="btn-sm btn btn-outline-primary"
                                          @click="updateUser(user.u_id, user.u_firstName, user.u_lastName, user.u_email, user.u_phone, user.u_pass, user.u_birthdate ,user.u_role)">Güncelle</button>

                                    <button style="margin-left: 10px;" class="btn-sm btn btn-outline-danger"
                                          @click="deleteUser(user.u_id)">Sil</button>


                              </div>

                        </td>
                  </tr>
            </tbody>
      </table>

      <!--! Kullanıcı ekle modal'ı -->
      <div class="modal fade" id="adduser" tabindex="-1">
            <div class="modal-dialog">
                  <div class="modal-content">
                        <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel">Kullanıcı Ekle</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <form @submit.prevent="addUser()">
                              <div class="modal-body">
                                    <div class="row">
                                          <div class="col-md-6 mb-3 text-start">
                                                <label class="form-label">Ad*</label>
                                                <input type="text" class="form-control" v-model="newUser[0].u_firstName"
                                                      required>
                                                <div>

                                                </div>
                                          </div>
                                          <div class="col-md-6 mb-3 text-start">
                                                <label class="form-label">Soyad*</label>
                                                <input type="text" class="form-control" v-model="newUser[0].u_lastName"
                                                      required>

                                          </div>
                                    </div>
                                    <div class="row">
                                          <div class="col-md-6 mb-3 text-start">
                                                <label class="form-label">Email*</label>
                                                <input type="email" class="form-control" v-model="newUser[0].u_email"
                                                      placeholder="example@hotmail.com" required>

                                          </div>
                                          <div class="col-md-6 mb-3 text-start">
                                                <label class="form-label">Telefon*</label>
                                                <input type="text" class="form-control" v-model="newUser[0].u_phone"
                                                      placeholder="5xxxxxxxxx" required>

                                          </div>
                                    </div>

                                    <div class="row">
                                          <div class="col-md-6 mb-3 text-start">
                                                <label class="form-label">Parola*</label>
                                                <input type="password" class="form-control" v-model="newUser[0].u_pass"
                                                      required>
                                          </div>

                                          <div class="col-md-6 mb-3 text-start">
                                                <label class="form-label">Rol*</label>
                                                <select v-model="newUser[0].role" class="form-select">
                                                      <option value=0>Kullanici</option>
                                                      <option value=1>Admin</option>
                                                </select>
                                          </div>
                                    </div>

                                    <div class="row">
                                          <div class="col-md-12 mb-3 text-start">
                                                <label class="form-label">Dogum Tarihi*</label>
                                                <input type="date" class="form-control" v-model="newUser[0].u_birthdate"
                                                      required>
                                          </div>

                                    </div>





                              </div>
                              <div class="modal-footer">
                                    <button class="btn btn-success w-100" type="submit">Kullanıcı Ekle</button>
                                    <span> {{ userMessage }}</span>
                              </div>
                        </form>
                  </div>
            </div>
      </div>

</template>

<!--! Programlama ve fonksiyonların olduğu yer -->
<script>
export default {
      data() {
            return {
                  newUser: [
                        {
                              u_firstName: "",
                              u_lastName: "",
                              u_email: "",
                              u_phone: "",
                              u_pass: "",
                              u_repeatPass: "",
                              u_birthdate: "",
                              role: 0,
                              check: true,
                        }
                  ],
                  users: [],
                  userMessage: null,
                  baseUrl: "http://localhost:3001"


            };
      },

      mounted() {
            this.getUsers()
      },

      watch: {
            // this usersta bir degisiklik olursa localstorageyi duzenlesin  
      },

      computed: {
      },

      methods: {

            //GET
            async getUsers() {
                  this.error = null;
                  try {
                        const res = await fetch(`${this.baseUrl}/api/users`);
                        if (!res.ok) throw new Error("Users endpoint hatası");
                        this.users = await res.json();
                  } catch (e) {
                        this.error = e.message;
                  }
            },

            async addUser() {
                  try {//!bu kodlari calistirmayi dene eger hata alirsan catche git
                        const res = await fetch(`${this.baseUrl}/api/users`, {
                              method: "POST",
                              headers: { //!Başlık / üst bilgi.HTTP isteğinin yanında gönderilen ek bilgilerdir.

                                    "Content-Type": "application/json" // Content-Type=Gönderdiğim içeriğin türü nedir?
                                    //application/json=Yani backend'e diyoruz ki:"Ben sana JSON formatında veri gönderiyorum."
                                    //genel amaci="Sunucuya gönderdiğim verinin JSON şeklinde olduğunu haber verir."

                              },
                              body: JSON.stringify({//body = asil gonderilen veri demek

                                    //! Benim ürün bilgilerim newProduct dizisinin içindeki ilk elemanda duruyor."
                                    // newProduct dizisinin içindeki ilk ürünün bilgilerini alıp,
                                    // JSON formatına çevirerek backend'e gönderiyoruz.
                                    firstName: this.newUser[0].u_firstName, //Formdaki isim bilgisini al.
                                    lastName: this.newUser[0].u_lastName,//Formdaki stock bilgisini al.
                                    email: this.newUser[0].u_email,//Formdaki price bilgisini al.
                                    phone: this.newUser[0].u_phone,
                                    pass: this.newUser[0].u_pass,
                                    birthdate: this.newUser[0].u_birthdate,
                                    role: this.newUser[0].role

                              })
                        });
                        if (!res.ok) throw new Error("addUser endpoint hatası");

                        const data = await res.json(); //Backend'in gönderdiği cevabı JSON olarak oku.

                        this.userMessage = data; //Backend'den gelen mesajı Vue'daki productMessage değişkenine kaydet.sunucu eklendi dedigi zamam gosterir

                        this.getUsers();// ekledikten sonra birdaha cek demek gerekiyor. her seferinde refresh atmamak icin. Yeni ürün eklendikten sonra backend'deki güncel ürün listesini tekrar çekerek ekranı yeniler.

                        //Kullanıcı yeni ürün ekledikten sonra eski bilgiler kutularda kalmasın diye giriş alanlarını başlangıç değerlerine döndürür.
                        this.newUser[0].u_firstName = "";
                        this.newUser[0].u_lastName = "";
                        this.newUser[0].u_email = "";
                        this.newUser[0].u_phone = "";
                        this.newUser[0].u_pass = "";
                        this.newUser[0].u_birthdate = "";



                  }
                  catch (e) {
                        this.userMessage = e.message;// eger hata alirsa catch calisiyor ve urun ekle butonu altinda urun basariyla eklendi kismina failed yazisi geliyor 
                  }
            },

            // PUT- kullanici Guncelleme
            async updateUser(u_id, u_firstName, u_lastName, u_email, u_phone, u_pass, u_birthdate, u_role) {//"Bana hangi ürün olduğunu id ile söyle, yeni bilgilerini de name, stock ve price olarak ver, ben gidip backend'de güncelleyeyim."

                  try {//!bu kodlari calistirmayi dene eger hata alirsan catche git
                        const res = await fetch(`${this.baseUrl}/api/users/${u_id}`, {
                              //!/${id} //! URL'nin sonuna dinamik olarak gönderilecek ürünün id değerini ekler; hangi ürün üzerinde işlem yapılacağını sunucuya bildirir.

                              method: "PUT",
                              headers: { //!Başlık / üst bilgi.HTTP isteğinin yanında gönderilen ek bilgilerdir.

                                    "Content-Type": "application/json"
                              },
                              body: JSON.stringify({//body = asil gonderilen veri demek

                                    firstName: u_firstName, //Formdaki isim bilgisini al.
                                    lastName: u_lastName,
                                    email: u_email,
                                    phone: u_phone,
                                    pass: u_pass,
                                    birthdate: u_birthdate,
                                    role: u_role

                              })
                        });
                        if (!res.ok) throw new Error("hatali veri");

                        const data = await res.json();

                        if (data) {
                              alert(data)
                        }
                        this.getUsers();
                  }
                  catch (e) {
                        console.log(e.message);
                  }
            },


            //DELETE kullanici SIL
            async deleteUser(u_id) {
                  try {
                        const res = await fetch(`${this.baseUrl}/api/users/${u_id}`, {

                              method: "DELETE",
                              headers: { //!Başlık / üst bilgi.HTTP isteğinin yanında gönderilen ek bilgilerdir.

                                    "Content-Type": "application/json" // Content-Type=Gönderdiğim içeriğin türü nedir?
                              },
                        });
                        if (!res.ok) throw new Error(res.error);

                        const data = await res.json(); //Backend'in gönderdiği cevabı JSON olarak oku.

                        if (data) {
                              alert("Kullanici Silindi")
                        }
                        this.getUsers();//guncelle isleminden sonra tekrardan verileri cek
                  }
                  catch (e) {
                        console.log(e.message);
                  }
            },
      }
};
</script>

<style scoped></style>