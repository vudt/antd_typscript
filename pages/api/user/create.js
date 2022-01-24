import axios from "axios"
export default async function handler(req, res) {
  if (req.method == 'POST') {
    try {
      // const {order_params} = req.body
      // const api = new WooCommerceRestApi(WC_Config)
      // const response = await api.post("orders", order_params)
      // const response = await axios.get(`${process.env.ROOT_END_POINT_API}/wp-json/menus/v1/menus/api-menu`)
      res.status(200).json({name: 'John'})
    } catch(err) {
      res.status(200).json(err)
    }
  } else {
    res.end()
  }	
}