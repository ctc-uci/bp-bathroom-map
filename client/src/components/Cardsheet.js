import React from 'react';
import Sheet from 'react-modal-sheet';
import './ModalSheet.css';

const CardSheet = (props) => {
  const [isOpen, setOpen] = React.useState(true);

  return (
    <>
      {/* <button onClick={() => setOpen(true)}>Open sheet</button> */}

      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>
              <div>{props.data.name}</div>
              <img src={props.data.img}/>
            </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}

export default CardSheet;