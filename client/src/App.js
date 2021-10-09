import { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = function () {
  const [data, setData] = useState([]);
  const [uid, setUid] = useState("");

  const onChange = function (event) {
    setUid(event.target.value);
  };

  const onSubmit = function (event) {
    event.preventDefault();
    const url = `/api/payments/${uid}`;
    axios.get(url).then(res => setData(res.data))
      .catch(e => console.log(e.ernno));
  };

  const reset = function (event) {
    setData([]);
    setUid("");
  };

  const itemList = data.map(item =>
    <tr key={item.id}>
      <td>{item.date}</td>
      <td>{item.interest}</td>
      <td>{item.loan}</td>
      <td>{item.paid}</td>
      <th>{item.balance}</th>
    </tr>
  );

  return (
    <>
      {!data.length &&
        <div className="container">
          <form onSubmit={onSubmit}>
            <div className="input-field">
              <input type="text" id="account-id" required value={uid} onChange={onChange} />
              <label className="account-id">Account ID</label>
            </div>
            <button className="btn blue darken-2 z-depth-0">Enter</button>
          </form>
        </div>
      }

      {data.length > 0 &&
        <>
          <div className="container row valign-wrapper">
            <span className="flow-text">Account Name: {data[0].name}</span>
            <span className="col s5"></span>
            <button onClick={reset} className="btn blue darken-2 z-depth-0 right">Exit</button>
          </div>

          <div className="container">
            <table className="highlight">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Interest</th>
                  <th>Loan</th>
                  <th>Paid</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {itemList}
              </tbody>
            </table>
          </div>
        </>
      }

    </>
  );
};
export default App;
