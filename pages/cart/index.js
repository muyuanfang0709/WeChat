import{ getSetting,
  chooseAddress,
  showModal,
  showToast,
  openSetting} from "../../utils/asyncWx.js";
Page({
  data: {
    address: {},
    cart:[],
    allChecked:false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    const address = wx.getStorageSync("address");
    const cart=wx.getStorageSync("cart")||[];
    //const allChecked=cart.length?cart.every(v=>v.checked):false;
    
    this.setData({address});
    this.setCart(cart);

  },
  // 1 点击 收获地址
  async handleChooseAddress(){
    try {
      // 1 获取权限状态
      const res1=await getSetting();
      const scopeAddress=res1.authSetting["scope.address"];
      // 判断 权限状态
      if(scopeAddress===false){
        await openSetting();
      }
      // 调用获取收获地址的 api
      let address=await chooseAddress();
      address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;
      // 存入缓存中
      wx.setStorageSync("address", address);
    } catch (error) {
        console.log(error);
      }
  },
  // 商品的选中
  handeItemChange(e){
    const goods_id=e.currentTarget.dataset.id;
    let {
      cart
    } = this.data;

    let index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;

    this.setCart(cart);

    
  },
  // 设置购物车状态同时 重新计算 底部工具栏的数据
  setCart(cart){
    let allChecked=true
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      }else{
        allChecked=false;
      }
    })
    allChecked=cart.length!=0?allChecked:false;
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    });
    wx.setStorageSync("cart", cart);
  },
  // 商品全选功能
  handleItemAllCheck(){
    let {cart,allChecked}=this.data;
    allChecked=!allChecked;
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart);
  },
  // 商品数量的编辑功能
async handleItemNumEdit(e){
        const {operation,id}=e.currentTarget.dataset;
        let {cart}=this.data;
        const index=cart.findIndex(v=>v.goods_id===id);
        if (cart[index].num === 1 && operation === -1) {
          // 弹窗提示
          const res=await showModal({content:"您是否要删除？"});
          if (res.confirm) {
            cart.splice(index,1);
            this.setCart(cart);
          }
        } else {
            cart[index].num+=operation;
            this.setCart(cart);
          }
      },
      // 点击结算
      async handlePay(){
              const{address,totalNum}=this.data;
              if(!address.userName){
                await showToast({title:"您还没有选择收获地址"});
                return;
              }
              if(totalNum===0){
                await showToast({title:"您还没有选购商品"});
                return;
              }
              wx.navigateTo({
                url:'/pages/pay/index'
              });
      }
})