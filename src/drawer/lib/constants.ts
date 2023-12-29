export const TRANSLATE_Y_REGEX =
  /(translateY\()([^)]*)(\))|(translate3d\([^,]*,)([^,]*)(,[^)]*\))/i

export const BAD_Y_REGEX = /(.*px)([0-9-].*)/i

export const PX_REGEX = /(\d{1,20})px/gi

export const PERCENT_REGEX = /[\d.]{1,20}%/
