import React from "react";

const FreeReport = () => {
  return (
    <div className="table-responsive">
      <table className="table ps-table ps-table--vendor">
        <thead>
          <tr>
            <th>date</th>
            <th>Product</th>
            <th>Price</th>
            <th>Sold</th>
            <th>Commission</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nov 4, 2019</td>
            <td>
              <a to="#">Marshall Kilburn Portable Wireless Bluetooth Spe...</a>
            </td>
            <td>$235.35</td>
            <td>25</td>
            <td>$2940.00</td>
            <td>24.5%</td>
          </tr>
          <tr>
            <td>Nov 4, 2019</td>
            <td>
              <a to="#">Unero Military Classical Backpack</a>
            </td>
            <td>$42.35</td>
            <td>10</td>
            <td>$211.00</td>
            <td>17.5%</td>
          </tr>
          <tr>
            <td>Nov 4, 2019</td>
            <td>
              <a to="#">Sleeve Linen Blend Caro Pana T-Shirt</a>
            </td>
            <td>$23.35</td>
            <td>80</td>
            <td>$935.00</td>
            <td>62.5%</td>
          </tr>
          <tr>
            <td>Nov 30, 2019</td>
            <td>
              <a to="#">Harman Kardon Onyx Studio 2.0</a>
            </td>
            <td>$299.35</td>
            <td>14</td>
            <td>$2095.00</td>
            <td>62.5%</td>
          </tr>
          <tr>
            <td>Nov 30, 2019</td>
            <td>
              <a to="#">Korea Long Sofa Fabric In Blu Navy Color</a>
            </td>
            <td>$299.35</td>
            <td>5</td>
            <td>$6095.00</td>
            <td>62.5%</td>
          </tr>
          <tr>
            <td colspan="3">
              <strong>Total</strong>
            </td>
            <td>
              <strong>124 Sale</strong>
            </td>
            <td colspan="2">
              <strong>$12.104.725</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FreeReport;
