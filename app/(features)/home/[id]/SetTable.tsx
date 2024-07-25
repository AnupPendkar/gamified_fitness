'use client';

import { EAction, EIntensity, ISet } from '@/app/typings/common';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useEffect, useState } from 'react';
import TableRecordDialog from './TableRecordDialog';

const SetTable = ({ sets }: { sets: any[] }) => {
  const [datasource, setDatasource] = useState<Array<ISet>>([]);
  const [clickedRow, setClickedRow] = useState<ISet | null>(null);

  function getTableColumnNames(): Array<string> {
    return ['', 'bdreq', 'Dodal Dpps', 'nfge', 'qwezsdfyr'];
    // return ['', 'Weight', 'Total Reps', 'Reps', 'Intensity'];
  }

  function constructDatasource(): void {
    setDatasource(sets);
  }

  function getStringFromIntensityEnum(id: EIntensity) {
    switch (id) {
      case EIntensity.LIGHT:
        return 'Light';

      case EIntensity.MODERATE:
        return 'Moderate';

      case EIntensity.INTENSE:
        return 'Intense';

      default:
        return '-';
    }
  }

  function handleSubmit(state: EAction, data?: any) {
    setClickedRow(null);
  }

  useEffect(() => {
    constructDatasource();
  }, []);

  return (
    <>
      <TableContainer>
        <Table size="medium" sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
          <TableHead sx={{ position: 'sticky' }}>
            <TableRow
              sx={{
                position: 'sticky',
                backgroundColor: (theme) => theme.palette.secondary.main,
              }}
            >
              {getTableColumnNames().map((columnName, index) => (
                <TableCell sx={{ textTransform: 'uppercase' }} key={index} align="center">
                  {columnName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {datasource?.map((itm) => (
              <TableRow onClick={() => setClickedRow(itm)} key={itm?.setNo}>
                <TableCell align="center" width={'40%'}>
                  <span className="fsr-16 font-isb ">{itm?.setNo}</span>
                  {/* <span className="fsr-16 font-isb ">Set {itm?.id}</span> */}
                </TableCell>

                <TableCell align="center" width={'15%'}>
                  <span className="fsr-16 font-isb ">{itm?.weight} Iw</span>
                  {/* <span className="fsr-16 font-isb ">{itm?.weight} Kg</span> */}
                </TableCell>

                <TableCell align="center" width={'20%'}>
                  <span className="fsr-16 font-isb ">{itm?.totalReps}</span>
                  {/* <span className="fsr-16 font-isb ">{itm?.reps} Reps</span> */}
                </TableCell>

                <TableCell align="center" width={'20%'}>
                  <span className="fsr-16 font-isb ">{itm?.completedReps}</span>
                  {/* <span className="fsr-16 font-isb ">{itm?.reps} Reps</span> */}
                </TableCell>

                <TableCell align="center" width={'25%'}>
                  <span className="fsr-16 font-isb ">{getStringFromIntensityEnum(+itm?.intensity)}</span>
                  {/* <span className="fsr-16 font-isb ">{itm?.intensity}</span> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableRecordDialog setData={clickedRow} handleSubmit={handleSubmit} />
    </>
  );
};

export default SetTable;
