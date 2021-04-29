export default {
  methods: {
    checkStock(product) {

      let available = (product) => { return true }
      let notAvailable = () => { return false }
      let checkTotalStock = (product) => { // no variant
        product.total_stock > product.count ? available() : notAvailable() }
      let checkStockCount = (product) => { // one variant
        product.this_stock > product.count ? available() : notAvailable() }
      let checkComboQty = (product) => { // two variants
        product.combo_qty > product.count ? available() : notAvailable() }
      let howManyVariants = (product) => {
        product.multiple_variants ? checkComboQty() : checkStockCount() }

      product.has_variant ? howManyVariants(product) : checkTotalStock(product)



      // if(product.combo_stock) {
      //   if (product.combo_stock > product.count) {
      //     return true
      //   }
      // } else if(product.this_stock) {
      //   if (product.this_stock > product.count) {
      //     return true
      //   }
      // } else {
      //   if(product.total_stock > product.count) {
      //     return true
      //   }
      // }
      // alert("Not enough in stock (from inside cart) to increase")
      // return false
    },
    numberOnly(event) {
      const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      const keyPressed = event.key
      if (!keysAllowed.includes(keyPressed)) {
        event.preventDefault()
      }
    },
  }
}
