// @flow
import React from 'react';
import className from 'classnames';
import AddColumnIcon from '../../assets/quill/AddColumnIcon';
import AddRowIcon from '../../assets/quill/AddRowIcon';
import AddTableIcon from '../../assets/quill/AddTableIcon';
import styles from '../css/CustomToolBar.css';

class CustomToolbar extends React.Component {
  fixSelectorPosition = () => {
    const rootContainer = document.getElementById('checklist-data-body');
    const selectorContainer = document.querySelector(
      '#table .ql-picker-options'
    );

    const rootBounds = rootContainer.getBoundingClientRect();
    const selectorBounds = selectorContainer.getBoundingClientRect();

    let shift = 0;
    if (rootBounds.right < selectorBounds.right) {
      shift = rootBounds.right - selectorBounds.right;
      selectorContainer.style.left = `${shift}px`;
    } else {
      selectorContainer.style.left = 0;
    }
  };

  render() {
    return (
      <div id="toolbar" className={styles.toolbar}>
        <select className={className('ql-font', styles.font)} defaultValue="">
          <option value="open-sans">Open Sans</option>
          <option value="martel-sans">Martel Sans</option>
          <option value="sans-serif">Sans Serif</option>
          <option value="verdana">Verdana</option>
          <option value="inconsolata">Inconsolata</option>
          <option value="roboto">Roboto</option>
          <option value="mirza">Mirza</option>
          <option value="arial">Arial</option>
        </select>
        <select className="ql-size" defaultValue="">
          <option value="10px">10px</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
          <option value="22px">22px</option>
          <option value="24px">24px</option>
          <option value="26px">26px</option>
          <option value="28px">28px</option>
          <option value="30px">30px</option>
          <option value="32px">32px</option>
          <option value="34px">34px</option>
          <option value="36px">36px</option>
          <option value="48px">48px</option>
          <option value="72px">72px</option>
        </select>
        <div className="ql-formats">
          <button className="ql-align" value="" />
          <button className="ql-align" value="center" />
          <button className="ql-align" value="right" />
          <button className="ql-align" value="justify" />
        </div>
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <select className="ql-color" defaultValue="" />
        <select className="ql-background" defaultValue="">
          <option value="" />
          <option value="yellow" />
        </select>
        <button className="ql-code-block" />
        <button className="ql-image" />
        <button className="ql-video" />
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        <button className="ql-list" value="check" />
        <button className="ql-link" />
        <div
          className={styles.addTable}
          onClick={this.fixSelectorPosition}
          onKeyPress={this.fixSelectorPosition}
          role="button"
          tabIndex={0}
          id="table"
        >
          <button className="table" value="">
            <AddTableIcon />
          </button>
          <select className="ql-table" defaultValue="">
            <option value="newtable_1_1">1x1</option>
            <option value="newtable_1_2">1x2</option>
            <option value="newtable_1_3">1x3</option>
            <option value="newtable_1_4">1x4</option>
            <option value="newtable_1_5">1x5</option>
            <option value="newtable_2_1">2x1</option>
            <option value="newtable_2_2">2x2</option>
            <option value="newtable_2_3">2x3</option>
            <option value="newtable_2_4">2x4</option>
            <option value="newtable_2_5">2x5</option>
            <option value="newtable_3_1">3x1</option>
            <option value="newtable_3_2">3x2</option>
            <option value="newtable_3_3">3x3</option>
            <option value="newtable_3_4">3x4</option>
            <option value="newtable_3_5">3x5</option>
            <option value="newtable_4_1">4x1</option>
            <option value="newtable_4_2">4x2</option>
            <option value="newtable_4_3">4x3</option>
            <option value="newtable_4_4">4x4</option>
            <option value="newtable_4_5">4x5</option>
            <option value="newtable_5_1">5x1</option>
            <option value="newtable_5_2">5x2</option>
            <option value="newtable_5_3">5x3</option>
            <option value="newtable_5_4">5x4</option>
            <option value="newtable_5_5">5x5</option>
            <option value="newtable_6_1">6x1</option>
            <option value="newtable_6_2">6x2</option>
            <option value="newtable_6_3">6x3</option>
            <option value="newtable_6_4">6x4</option>
            <option value="newtable_6_5">6x5</option>
            <option value="newtable_7_1">7x1</option>
            <option value="newtable_7_2">7x2</option>
            <option value="newtable_7_3">7x3</option>
            <option value="newtable_7_4">7x4</option>
            <option value="newtable_7_5">7x5</option>
            <option value="newtable_8_1">8x1</option>
            <option value="newtable_8_2">8x2</option>
            <option value="newtable_8_3">8x3</option>
            <option value="newtable_8_4">8x4</option>
            <option value="newtable_8_5">8x5</option>
            <option value="newtable_9_1">9x1</option>
            <option value="newtable_9_2">9x2</option>
            <option value="newtable_9_3">9x3</option>
            <option value="newtable_9_4">9x4</option>
            <option value="newtable_9_5">9x5</option>
            <option value="newtable_10_1">10x1</option>
            <option value="newtable_10_2">10x2</option>
            <option value="newtable_10_3">10x3</option>
            <option value="newtable_10_4">10x4</option>
            <option value="newtable_10_5">10x5</option>
          </select>
        </div>
        <button className="ql-table" value="append-row">
          <AddRowIcon />
        </button>
        <button className="ql-table" value="append-col">
          <AddColumnIcon />
        </button>
      </div>
    );
  }
}

export default CustomToolbar;
