import cryptoJs from "crypto-js"

const encryptData = (data: string) => cryptoJs.AES.encrypt(data, process.env.REACT_APP_ENCRYPT_DATA!).toString()

const decryptData = (data: string) => {
    try{
        const decrypt = cryptoJs.AES.decrypt(data, process.env.REACT_APP_ENCRYPT_DATA!).toString(cryptoJs.enc.Utf8)
        return decrypt
    }catch{
        return false
    }
}

export {
    encryptData,
    decryptData
}