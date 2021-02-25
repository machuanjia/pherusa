/*
 * @Author: xulijing
 * @Date: 2021-02-25 10:41:29
 * @LastEditTime: 2021-02-25 11:12:30
 * @FilePath: /pherusa/src/interfaces/image-mark.ts
 */
import React from 'react';

export type LabelItem = {
  labelID: number;
  labelName: string;
  color: string;
};

export type MarkStyle = {
  width?: StyleProperty;
  height?: StyleProperty;
  top?: StyleProperty;
  left?: StyleProperty;
  right?: StyleProperty;
  bottom?: StyleProperty;
  borderColor?: string;
};

export type LabelMarkItem = {
  text: string;
  charPostions: number[][];
  styles: MarkStyle[];
};

export type LabelMark = LabelMarkItem[];

type StyleProperty = string | number;

export type MarkSelect = {
  text: string;
  charPostions: number[][];
  style: MarkStyle;
};

export type HighlightItem = {
  width: number;
  height: number;
  top: number;
  left: number;
};
