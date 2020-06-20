import React from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';
import NewForm from './components/NewForm';
import moment from 'moment';

const Component = ({weathers, reminders, cell}) => {
    if (!cell.visible){
        return (<div className='hidden' ></div>)
    }
    let weather = weathers.find(item => moment(item.dt_txt).date()===cell.id)
    weather = weather? weather.weather[0].description:"";
    let header = cell.visible? cell.value +' '+ weather : "";
    reminders = reminders.filter(rem => rem.time.date()===cell.id);
    reminders.sort((a, b) => a.time.diff(b.time));
    return(
    <div className='cell'>
         <List
              locale={{
                emptyText: <div/>
              }}
              header={header}
              size="small"
              dataSource={reminders}
              renderItem={ item => {
                return(
                    <List.Item>
                        <NewForm item={item} />
                    </List.Item>
                )
              }}
         />
         </div>
    );
}

const mapStateToProps = state => {
  return {
    weathers: state['weathers'],
    reminders: state['reminders']

  };
};

export default connect(mapStateToProps)(Component);