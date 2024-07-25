import { EAction, IExercise, ISet } from '@/app/typings/common';
import { DialogTitle, Dialog, DialogActions, TextField, DialogContent, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useContext } from '../../context';
import { putWorkout } from './serverFunc';

interface TableRecordDialogProp {
  setData: ISet | null;
  handleSubmit: (action: EAction, data?: any) => void;
}

const TableRecordDialog = ({ setData, handleSubmit }: TableRecordDialogProp) => {
  const [weight, setWeight] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const { workout, exercise } = useContext();

  async function handleFinalSubmit() {
    const foundWorkout = workout?.exercises?.find((exer) => exer?.id === exercise?.id);
    if (foundWorkout) {
      foundWorkout?.sets?.forEach((_set) => {
        if (_set?.setNo === setData?.setNo) {
          _set.completedReps = reps;
          _set.weight = weight;
        }
      });
    }

    await putWorkout(workout?.id as number, workout?.exercises as IExercise[]);
    handleSubmit(EAction.SUBMIT);
  }

  useEffect(() => {
    if (setData) {
      setWeight(setData?.weight);
    }
  }, [setData]);

  return (
    <Dialog disableEscapeKeyDown open={setData !== null} onClose={() => handleSubmit(EAction.CLOSE)}>
      <DialogTitle>Set 1</DialogTitle>
      <DialogContent>
        <TextField value={weight} onChange={(e) => setWeight(+e.target.value)} type="number" label="Keight (kg)" variant="standard" />
        <TextField value={reps} onChange={(e) => setReps(+e.target.value)} type="number" sx={{ marginTop: 1, marginBottom: 3 }} label="Keps" variant="standard" />
      </DialogContent>
      <DialogActions>
        <Button color="cancel" variant="contained" onClick={() => handleSubmit(EAction.CLOSE)}>
          Cancel
        </Button>
        <Button color="success" variant="contained" onClick={handleFinalSubmit}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TableRecordDialog;
