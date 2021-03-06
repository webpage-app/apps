const coffees = []
const extras = []
const formatData = (array, tableID) => {
    const table = document.querySelector(`#${tableID}`)
    const headers = []
    for (var i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        let data = {}
        for (var j = 0, col; col = row.cells[j]; j++) {
            if (i == 0) headers.push(col.innerText) // if first row then these texts are column headers
            else data[headers[j]] = col.innerText // second row is content, append with the correct heading
        }
        if (i > 0) array.push(data) // do not push Extra object if still in first row (the heading row)
    }
    document.body.removeChild(table)
}
const getData = async (params, callback_func, callback_params) => {
    const table = document.createElement('table')
    table.id = params.id
    document.querySelector('body').append(table)
    const g_spreadsheet = `https://docs.google.com/spreadsheets/d/${params.g_spreadsheet_ID}/edit#gid=0`;


    await $(`#${table.id}`).sheetrock({
        url: g_spreadsheet,
        query: params.specified_columns,
        callback: function (error, options, response) {
            console.log(error, options, response);
            formatData(params.array, table.id)
            if (callback_params.params) {
                callback_func(
                    params =
                    {
                        array: callback_params.array,
                        id: callback_params.id,
                        specified_columns: callback_params.specified_columns,
                        g_spreadsheet_ID: callback_params.g_spreadsheet_ID
                    },
                    callback_func = main,
                    callback_params =
                    {
                        params: false
                    }
                )
            }
            else callback_func()
        }
    })
}

getData(
    params =
    {
        array: coffees,
        id: 'CoffeesTable',
        specified_columns: "select A,B,C,D,E",
        g_spreadsheet_ID: '1od__SyEUppK9ynX9YbRQYGceJ_8y_1_WGN-N1lXg-Qw'
    },
    callback_func = getData,
    callback_params =
    {
        params: true,
        array: extras,
        id: 'ExtrasTable',
        specified_columns: "select A,B,C",
        g_spreadsheet_ID: '1x2S8fjWfOku15WFBHHma2emtcI5BsjVx-ybWCjVeVlg'
    }

) // chain fun call to main
