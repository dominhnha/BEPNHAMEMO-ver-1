import React from 'react'
import PropTypes from 'prop-types'
import "./Dashboard.scss"
const Dashboard = props => {
  return (
    <main>
        <h1>Dashboard</h1>
        <div className="Dashboard__insights">
            <div className="Dashboard__sales">
                <span>
                    <i class='bx bxs-dollar-circle' ></i>
                </span>
                <div className="Dashboard__sales__middle">
                    <h3>Total Sales</h3>
                    <h1>$25,024</h1>
                </div>
                <small className="Dashboard__sales__text-muted">Last 24 Hours</small>
            </div>
            <div className="Dashboard__sales">
                <span>
                    <i class='bx bxs-dollar-circle' ></i>
                </span>
                <div className="Dashboard__sales__middle">
                    <h3>Total Sales</h3>
                    <h1>$25,024</h1>
                </div>
                <small className="Dashboard__sales__text-muted">Last 7 Days</small>
            </div>
            <div className="Dashboard__sales">
                <span>
                    <i class='bx bxs-dollar-circle' ></i>
                </span>
                <div className="Dashboard__sales__middle">
                    <h3>Total Sales</h3>
                    <h1>$25,024</h1>
                </div>
                <small className="Dashboard__sales__text-muted">Last 30 Days</small>
            </div>
        </div>
        {/* ------------------ END OF INSIGHTS ------------------ */}
        <div className="Dashboard__recent-orders">
            <h2>Recent Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th className="bold">Order's ID</th>
                        <th className="bold">Cost</th>
                        <th className="bold">Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>6D3cQTJ71CRdmaq12n8S</td>
                        <td>2,151,000</td>
                        <td>356/115/34 Hoàng Diệu</td>
                        <td className="text-can-hover">Details</td>
                    </tr>
                    
                    <tr>
                        <td>6D3cQTJ71CRdmaq12n8S</td>
                        <td>2,151,000</td>
                        <td>356/115/34 Hoàng Diệu</td>
                        <td className="text-can-hover">Details</td>
                    </tr>
                    <tr>
                        <td>6D3cQTJ71CRdmaq12n8S</td>
                        <td>2,151,000</td>
                        <td>356/115/34 Hoàng Diệu</td>
                        <td className="text-can-hover">Details</td>
                    </tr>
                    <tr>
                        <td>6D3cQTJ71CRdmaq12n8S</td>
                        <td>2,151,000</td>
                        <td>356/115/34 Hoàng Diệu</td>
                        <td className="text-can-hover">Details</td>
                    </tr>
                    <tr>
                        <td>6D3cQTJ71CRdmaq12n8S</td>
                        <td>2,151,000</td>
                        <td>356/115/34 Hoàng Diệu</td>
                        <td className="text-can-hover">Details</td>
                    </tr>
                </tbody>
            </table>
            <a href='#' className='text-can-hover'>Show All</a>
        </div>
    </main>
  )
}

Dashboard.propTypes = {}

export default Dashboard


/* <div>
                        <table className="detail-table">
                            <thead>
                                <tr>
                                    <th className="bold">Product's Name</th>
                                    <th className="bold">Product's ID</th>
                                    <th className="bold">Quantity</th>
                                    <th className="bold">Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Bánh quy gừng dịp giáng sinh</td>
                                    <td>QN2QqV40L7rF0FsLqZc5</td>
                                    <td>7</td>
                                    <td>140,000</td>
                                </tr>
                                <tr>
                                    <td>Combo tết tràn niềm vui</td>
                                    <td>tgRbQzDEoZ8Rqsb6wPWS</td>
                                    <td>6</td>
                                    <td>1,500,000</td>
                                </tr>
                                <tr>
                                    <td>Bánh dứa mật tươi vị mới</td>
                                    <td>oexZa5MosyLxrbx1HZ9J</td>
                                    <td>3</td>
                                    <td>750,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */