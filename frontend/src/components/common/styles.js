const colors = {
  gray: '#bbb'
};
const paddingDefault = 20;
const marginDefault = paddingDefault;

export const customModal = {
  content: {
    top                   : '50%',
    left                  : '50%',
    minWidth              : 270,
    textAlign             : 'center',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}

export const styles = {
  modalClose: {
    position: 'absolute',
    top: 20,
    right: 20,
    cursor: 'pointer'
  },
  loading: {
  	color: colors.gray,
  	minWidth: 20,
  	display: 'inline-block'
  },
  publishedDate: {
    color: colors.gray
  },
  commentBody: {
    marginBottom: marginDefault
  },
  removeMarginTop: {
    marginTop: 0
  },
  removeMargin: {
    margin: 0
  },
  colorGray: {
    color: colors.gray
  },
  marginBottom: {
    marginBottom: marginDefault
  }
}