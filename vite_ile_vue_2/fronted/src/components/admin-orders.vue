<template>
      <h3 style="color: red;">Siparişler</h3>
      <table class="table table-striped">
            <thead>
                  <tr>
                        <th scope="col">#</th>
                        <th scope="col">Siparis No</th>
                        <th scope="col">Siparis Veren</th>
                        <th scope="col">Toplam Tutar</th>
                        <th scope="col">Siparis Tarihi</th>
                         <th scope="col">Durum</th> 
                        <th scope="col">Islem</th> 


                  </tr>

            </thead>
            <tbody>

                  <tr v-for="order,index in orders">
                        <td> {{ index + 1 }}</td>
                        <td>{{ order.o_no }} </td>
                        <td>{{ order.o_person }} </td>
                        <td>{{ order.o_amount }} </td>
                        <td>{{ order.o_created_at }}</td>
                        <td>
                              <select class="form-select" v-model="order.o_status">
                                    <option value="Hazirlaniyor">Hazirlaniyor</option>
                                    <option value="Kargoya Verildi">Kargoya Verildi</option>
                                    <option value="Teslim Edildi">Teslim Edildi</option>
                                    <option value="İptal Edildi">İptal Edildi</option>
                              </select>
                        </td>
                        <td>
                              <div class="text-nowrap">
                                    <button @click="updateOrder(order.o_id, order.o_status)"
                                          class="btn-sm btn btn-outline-primary">Güncelle</button>

                                    <!-- <button style="margin-left: 10px;" class="btn-sm btn btn-outline-danger "
                                          @click="deleteOrder(order.id)">Sil</button>

                                    <button style="margin-left: 10px;" @click="detailID = index" type="button"
                                          class="btn-sm btn btn-outline-secondary" data-bs-toggle="modal"
                                          data-bs-target="#details"> Detaylar
                                    </button> -->
                              </div>
                        </td>
                  </tr>
            </tbody>
      </table>

      <!--!  Order Details modal'ı -->
      <div v-if="orders.length > 0" class="modal fade" id="details" tabindex="-1">
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
      </div>

</template>

<!--! Programlama ve fonksiyonların olduğu yer -->
<script>
export default {
      data() {
            return {
                  detailID: 0,
                  orders: [],
                  error: null,
                  baseUrl: "http://localhost:3001"
            };
      },
      mounted() {
            this.getOrders()
      },

      watch: {
      },

      computed: {
      },

      methods: {
            deleteItem(value, index) {
                  if (value == 'order') {
                        this.orders.splice(index, 1)
                        this.detailID = 0
                  }
            },
            async getOrders() {
                  try {
                        const res = await fetch(`${this.baseUrl}/api/orders`);
                        if (!res.ok) throw new Error("Orders endpoint hatası");
                        this.orders = await res.json();
                  } catch (e) {
                        console.log(e.message);
                  }
            },

            // PUT- Siparis Guncelleme
            async updateOrder(id, status) {
                  try {
                        const res = await fetch(`${this.baseUrl}/api/orders/${id}`, {
                              method: "PUT",
                              headers: { 

                                    "Content-Type": "application/json" 
                              },
                              body: JSON.stringify({//body = asil gonderilen veri demek
                                    
                                    status: status,
                                   
                              })
                        });
                        if (!res.ok) throw new Error("updateOrder endpoint hatası");

                        const data = await res.json(); 

                        if (data) {
                              alert(data)
                        }
                        this.getOrders();
                  }
                  catch (e) {
                        console.log(e.message);
                  }
            },

            //DELETE SIPARIS SIL
            // async deleteOrder(id) {
            //       try {
            //             const res = await fetch(`${this.baseUrl}/api/orders/${id}`, {
            //                   method: "DELETE",
            //                   headers: { 

            //                         "Content-Type": "application/json" 
            //                   },
            //             });
            //             if (!res.ok) throw new Error("deleteOrder endpoint hatası");

            //             const data = await res.json(); 

            //             if (data) {
            //                   alert("Urun Silindi")
            //             }
            //             this.getOrders();
            //       }
            //       catch (e) {
            //             console.log(e.message);
            //       }
            // },
      }
};
</script>
<style scoped></style>