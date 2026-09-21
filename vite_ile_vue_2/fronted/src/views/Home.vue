<template>
      
</template>


<script setup>

</script>


<style scoped>
.hero-section {
  /* Arka plan resminin yolu (assets altındaysa bu şekilde yönlendirebilirsiniz) */
  background-image: url('../assets/img/bg-1.jpeg'); 
  
  /* Resmin alanı tamamen kaplaması ve ortalanması için */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  /* Ekran yüksekliğini ayarlamak için (örneğin ekranın %80'i veya sabit bir px) */
  min-height: 80vh; 
  
  /* İçerikleri (yazıları) dikey ve yatayda ortalamak için */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Yazıların okunabilirliği için metin stilleri */
.slider-yazi {
  text-align: center;
  color: #ffffff;
  z-index: 2;
}

/* Opsiyonel: Arka plan resmini biraz karartıp yazıyı öne çıkarmak isterseniz */
.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Siyah karartma maskesi */
  z-index: 1;
}
</style>
