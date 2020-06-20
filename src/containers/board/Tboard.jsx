import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import Cell from '../cell/Cell';


const getColumns = () => {
    return moment.weekdays().map((item,index) =>(
        {title: item,
         dataIndex: index,
         key:index,
         render: obj =><Cell cell={obj} />
         })
    )
}

const getRandomId = () => {
    return Math.floor(Math.random() * 10000)
}

const getData = props =>{
    let firstDay = moment(moment().add(1, 'M').format('YYY-MM')).day();
    let lastDay = moment().add(1, 'M').daysInMonth();
    let result = [];
    let day = 1;
    let row_size = 5;
    let column_size = 7;
    let rows =[]
    for (let row = 0; row < row_size; row++) {
        rows =[]
        for (let col = 0; col < column_size; col++) {
          let item = {
            id: day,
            value: day,
            row_id: row,
            column_id: col,
            editable: true,
            visible:true
          }
          if ((row === 0 && col < firstDay) || day > lastDay ){
            item.id = getRandomId()
            item.editable = false;
            item.visible = false;
          }else
            day++;
          rows[col] = item;
        }
        result.push(rows)
    }
    return result;
}
const Component = () =>
    <Table
        bordered
        pagination={false}
        columns={getColumns()}
        dataSource={getData()}
    />

export default Component