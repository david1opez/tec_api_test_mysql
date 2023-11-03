const mysql = require("../database/db");

async function makeQuery(q) {
  return new Promise((resolve, reject) => {
    var conn = mysql.getConnection();

    conn.connect((error) => {
      if (error) {
        reject({ status: 500, error: error.message });
        return;
      }

      conn.query(q, (error, data, fields) => {
        if (error) {
          reject({ status: 500, error: error.message });
        } else {
          resolve({ status: 200, data });
        }

        conn.end();
      });
    });
  })
}

async function insert(query, data) {
  return new Promise((resolve, reject) => {
    try {
      const connection = mysql.getConnection();

      connection.connect((error) => {
        if (error) {
          reject({ status: 500, error: error.message });
          return;
        }

        connection.query(query, data, (error, result) => {
          connection.end();

          if (error) {
            reject({ status: 500, error: error.message });
            return;
          } else {
            resolve({ status: 200 });
          }
        });
      });
    } catch (error) {
      reject({ status: 500, error: error.message });
      return;
    }
  })
}


async function getPaneles(req, res) {
  var query = 'SELECT * FROM PanelesSolares';

  try {
    const result = await makeQuery(query);

    res.status(result.status);

    if (result.status !== 200) {
      res.send(result.error);
    } else {
      res.json(result.data);
    }
  } catch (error) {
    res.status(500).send(error.error);
  }
}

async function setPanel(req, res) {
  var query = 'INSERT INTO panelessolares (OrientacionOptima, EficienciaEstimada, CostosEstimados, AhorrosEstimados) values (?, ?, ?, ?)';
  let data = req.body;

  let params = [
    data.orientacionOptima,
    data.eficienciaEstimada,
    data.costosEstimados,
    data.ahorrosEstimados
  ]

  let result = await insert(query, params);

  console.log(result)

  if(result.status != 200) {
    res.status(500).send('Error')
  }
  else {
    res.status(200).send('Panel Agregado')
  }
}

module.exports = {getPaneles, setPanel};
