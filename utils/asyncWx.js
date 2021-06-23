// promise 形式的 getSetting
export const getSetting = () => {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (result) => {
          resolve(result);
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
  
  // 选择地址
  export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
      wx.chooseAddress({
        success: (result) => {
          resolve(result);
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
  
  // 打开设置
  export const openSetting = () => {
    return new Promise((resolve, reject) => {
      wx.openSetting({
        success: (result) => {
          resolve(result);
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
  
  // 弹出对话框
  
 /* export const showModal = ({content}) => {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: '提示',
        content: content,
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        }
      })
    })
  }
  
  // 提示信息
  
  export const showToast = ({title}) => {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        icon: 'none',
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        }
      })
    })
  }*/

  export const showModal = ({content}) => {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: '提示',
        content: '您是否要删除',
        success: (res) => {
          resolve(res);
        },
        fail:(err)=>{
          reject(err);
        }
      })
    })
  }

  export const showToast = ({title}) => {
    return new Promise((resolve, reject) => {
      wx.showToast({
        title: title,
        icon: 'none',
        success: (res) => {
          resolve(res);
        },
        fail:(err)=>{
          reject(err);
        }
      })
    })
  }