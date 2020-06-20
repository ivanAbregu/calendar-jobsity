import {connect} from "react-redux";
import {Action} from "../actions";
import SketchPickerColor from '../../SketchPicker'
import React, { useState } from 'react';
import { Button, Modal, Form, Input, DatePicker } from 'antd';
import moment from 'moment';


const CollectionCreateForm = ({ visible, onCreate, onCancel,onDelete, item }) => {
  const [form] = Form.useForm();

  const onSubmit = () => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
  }
  const onReturn = () => {
    form.resetFields()
    onCancel()
  }
  const on_delete = () => {
    form.resetFields()
    onDelete()
  }
  let init_values = {
    time: moment(),
    reminder: 'something...',
    color: {
      r: '301',
      g: '112',
      b: '19',
      a: '1',
    }
  }

  if(item){
    form.resetFields()
    init_values = item;
  }
  return (
    <Modal
      visible={visible}
      title="Reminder"
      okText="Enter"
      cancelText="Cancel"
      footer={[
            <Button key="back" onClick={onReturn}>
              Return
            </Button>,
            <Button key="submit" type="primary"  onClick={onSubmit}>
              Submit
            </Button>,
            <div>
                {item &&
                <Button key="submit" type="primary"  onClick={on_delete}>
                  Delete
                </Button>}
                </div>,
          ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={init_values}
      >
        <Form.Item
          name="reminder"
          label="Reminder"
          rules={[
            {
              required: true,
              message: 'Please input the reminder!',
            },
          ]}
        >
          <Input maxLength="30" />
        </Form.Item>
        <Form.Item name="time" label="time">
         <DatePicker renderExtraFooter={() => ''} showTime />
        </Form.Item>
        <Form.Item name="city" label="City">
          <Input maxLength="30" />
        </Form.Item>
        <Form.Item name="color" className="collection-create-form_last-form-item">
          <SketchPickerColor init_color={init_values.color}/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CollectionsPage = (props) => {
  const [visible, setVisible] = useState(false);
  let item = props.item;
  let btn_label = 'Add Reminder';
  let btn_size = 'large';
  let btn_style = {};
  if(item){
    btn_label = props.item.reminder;
    btn_size = 'small';
    let color = Object.values(props.item.color);
    btn_style = {
     background: `rgb(${color})`,
     borderColor: `rgb(${color})`,
     width: '200px',

    };
  }
  const onCreate = values => {
    setVisible(false);
    if(item)
        props.onEditReminder(values, item.time)
    else
        props.onAddReminder(values)
  };
  const onDelete =() => {
    setVisible(false);
    if(item)
        props.onDeleteReminder(item.time)
  };

  return (
    <div className='btn-modal-form'>
      <Button
        style={btn_style}
        type="primary"
        size={btn_size}
        onClick={() => {
          setVisible(true);
        }}
      >
        {btn_label}
      </Button>
      <CollectionCreateForm
        item={item}
        visible={visible}
        onCreate={onCreate}
        onDelete={onDelete}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

const mapStateToProps = state => {
    return {
        current_store: state,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddReminder: (obj) => dispatch(Action.onAddReminder(obj)),
        onEditReminder: (obj, time) => dispatch(Action.onEditReminder(obj,time)),
        onDeleteReminder: (time) => dispatch(Action.onDeleteReminder(time)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsPage);
