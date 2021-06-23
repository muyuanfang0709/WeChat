import{ getSetting,
  chooseAddress,
  showModal,
  showToast,
  openSetting} from "../../utils/asyncWx.js";
Page({
  data: {
    address: {},
    cart:[],
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    const address = wx.getStorageSync("address");
    let cart=wx.getStorageSync("cart")||[];
    //const allChecked=cart.length?cart.every(v=>v.checked):false;
    cart=cart.filter(v=>v.checked);

    this.setData({address});
    let allChecked=true
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      totalPrice+=v.num*v.goods_price;
      totalNum+=v.num;
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },
  handleOrderPay(){
    const token =wx.getStorageSycn("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    console.log("已经存在token");
  }
})