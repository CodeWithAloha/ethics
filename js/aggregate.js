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

      console.log(data)

      const legislators
        = [... new Set(data.map(dat => dat[columns.indexOf('filer')]))]
      resolve(legislators)
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
  .then(([loans, spending])=> {

    const legislators =
      [... new Set(Object.keys(loans).concat(Object.keys(spending)))]

    const data = legislators.reduce((obj, leg) => {
      return Object.assign(obj, {
        [leg]: {
          loans: loans[leg],
          spending: spending[leg]
        }
      })
    }, {})
    window.data = data
  })
