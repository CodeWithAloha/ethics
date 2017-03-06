'use strict'

const promises = [];

// Financial Disclosure
// promises.push(new Promise((resolve, reject) => {
//   fetch('http://www.codeforhawaii.org/ethics/data/financial-disclosure.json')
//     .then(data => data.json())
//     .then(data => {
//       const columns =
//         data.meta.view.columns.map(column => column.fieldName)
//       const legislators =
//         data.data.map(dat => dat[columns.indexOf('filer')])
//       resolve(legislators)
//     })
// }));
//
promises.push(new Promise(resolve => {
  fetch('http://www.codeforhawaii.org/ethics/data/gift.json')
    .then(data => data.json())
    .then(({ meta, data }) => {
      const columns =
        meta.view.columns.map(column => column.fieldName)

      const NAME = columns.indexOf('filer')
      const TITLE = columns.indexOf('title')

      const is_valid = (title => {
        return title.includes('Legislator') || title.includes('Governor')
      })

      const legislators
        = [... new Set(
            data
              .filter(dat => is_valid(dat[TITLE]))
              .map(dat => dat[NAME])
          )]

      resolve(legislators.reduce((obj, leg) => {
        return Object.assign(obj, {
          [leg]: data.filter(dat => dat[NAME] == leg)
        })
      }, {}))
    })
}))

promises.push(new Promise(resolve => {
  fetch('http://www.codeforhawaii.org/ethics/data/loans.json')
    .then(data => data.json())
    .then(({ meta, data }) => {
      const columns =
        meta.view.columns.map(column => column.fieldName)

      const filteredData = data.filter((dat) => {
        const date = moment(dat[columns.indexOf('date')])
        return date.year() == 2016
      })

      const NAME = columns.indexOf('candidate_name')

      const legislators
        = [... new Set(filteredData.map(dat => dat[NAME]))]

      resolve(legislators.reduce((prev, leg) => {
        return Object.assign(prev, {
          [leg]: filteredData.filter(dat => dat[NAME] === leg)
        })
      }, {}))
    })
}))

promises.push(new Promise(resolve => {
  fetch('http://www.codeforhawaii.org/ethics/data/campaign-spending.json')
    .then(data => data.json())
    .then(({ meta, data }) => {
      const columns =
        meta.view.columns.map(column => column.fieldName)

      const NAME = columns.indexOf('candidate_name')

      const legislators = [... new Set(data.map(dat => dat[NAME]))]

      resolve(legislators.reduce((prev, leg) => {
        return Object.assign(prev, {
          [leg]: data.filter(dat => dat[NAME] === leg)
        })
      }, {}))
    })
}))


Promise
  .all(promises)
  .then(([gift, loans, spending])=> {

    const legislators =
      [... new Set(
        Object.keys(loans)
          .concat(Object.keys(spending))
          .concat(Object.keys(gift))
        )
      ]

    const data = legislators.reduce((obj, leg) => {
      return Object.assign(obj, {
        [leg]: {
          loans: loans[leg],
          spending: spending[leg],
          gift: gift[leg]
        }
      })
    }, {})

    new Vue({
      el: '.app',
      data: {
        data: data
      },
      template: `
      <div>
        <h1>Legislators</h1>
        <p>This is a list of legislators and whether or not a certain dataset
           exists for that legislator</p>
        <article :style="{display: 'flex', flexWrap: 'wrap'}">

          <div v-for="(data, name) in data" :style="{flex: '0 0 25%'}">
            <h3>{{ name }}</h3>
            <div>
              Loans: <span v-if="data.loans">&#10003;</span>
                     <span v-else>&#10007;</span>
            </div>
            <div>
              Spending: <span v-if="data.spending">&#10003;</span>
                     <span v-else>&#10007;</span>
            </div>
            <div>
              Gifts: <span v-if="data.gift">&#10003;</span>
                     <span v-else>&#10007;</span>
            </div>
          </div>
        </article>
      </div>`
    })

    window.data = data
  })
