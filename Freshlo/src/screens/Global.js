export default class Global {
  static myInstance = null;

  Category = "";
  Regular = "";
  ProductName="";
  ProductWeight="";
  ProductMeasurement="";
  SellingPrice="";
  MarketPrice="";
  ProductCategory="";
  /**
   * @returns {Global}
   */
  static getInstance() {
    if (Global.myInstance == null) {
      Global.myInstance = new Global();
    }

    return this.myInstance;
  }

  getCategory() {
    return this.Category;
  }
  getRegular() {
    return this.Regular;
  }
  getProductName() {
    return this.ProductName;
  }
  getProductWeight() {
    return this.ProductWeight;
  }
  getProductMeasurement() {
    return this.ProductMeasurement;
  }
  getSellingPrice() {
    return this.SellingPrice;
  }
  getMarketPrice() {
    return this.MarketPrice;
  }
  getProductCategory() {
    return this.ProductCategory;
  }
  setCategory(Category) {
    this.Category = Category;
  }
  setRegular(Regular) {
    this.Regular = Regular;
  }

  setProductName(ProductName) {
    this.ProductName = ProductName;
  }
  setProductWeight(ProductWeight) {
    this.ProductWeight = ProductWeight;
  } 
  setProductMeasurement(ProductMeasurement) {
    this.ProductMeasurement = ProductMeasurement;
  } 
  setSellingPrice(SellingPrice) {
    this.SellingPrice = SellingPrice;
  } 
  setMarketPrice(MarketPrice) {
    this.MarketPrice = MarketPrice;
  } 
  setProductCategory(ProductCategory) {
    this.ProductCategory = ProductCategory;
  } 
}
