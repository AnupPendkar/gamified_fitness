'use client';

import { EIntensity } from '@/app/typings/common';
import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, styled, Stack, Skeleton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
const SetTable = ({ sets }: { sets: any[] }) => {
  const [datasource, setDatasource] = useState<any>([]);

  function getTableColumnNames(): Array<string> {
    return ['', 'bdreq', 'nfge', 'qwezsdfyr'];
    // return ['', 'Weight', 'Reps', 'Intensity'];
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
              <TableRow key={itm?.id}>
                <TableCell align="center" width={'40%'}>
                  <span className="fsr-16 font-isb ">{itm?.setNo}</span>
                  {/* <span className="fsr-16 font-isb ">Set {itm?.id}</span> */}
                </TableCell>

                <TableCell align="center" width={'15%'}>
                  <span className="fsr-16 font-isb ">{parseInt(itm?.weight)} Iw</span>
                  {/* <span className="fsr-16 font-isb ">{itm?.weight} Kg</span> */}
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
    </>
  );
};

export default SetTable;
