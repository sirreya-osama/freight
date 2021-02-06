import { Request, Response } from 'express';
import { FREIGHTS } from './db-data';

export function searchFreights(req: Request, res: Response) {
  console.log('Searching for freights ...');

  const queryParams = req.query;
  const  pageNumber = parseInt(queryParams.pageNumber) || 0,
    pageSize = parseInt(queryParams.pageSize) || 3,
    origin = queryParams.origin || '',
    destination = queryParams.destination || '',
    pickup_date = queryParams.pickup_date || '',
    sea = queryParams.sea || 'false',
    air = queryParams.air || 'false',
    land = queryParams.land || 'false',
    orderBy = queryParams.orderBy || '',
    sortOrder = queryParams.sortOrder || 'asc';

  let freights = Object.values(FREIGHTS).sort((F1, F2) => F1.id - F2.id);

  if (sea === 'true' || air === 'true' || land === 'true') {
    const mode = [];
    if (sea === 'true') {
      mode.push('sea')
    };
    if (air === 'true') {
      mode.push('air')
    };
    if (land === 'true') {
      mode.push('land')
    };
    freights = freights.filter(r => mode.indexOf(r.mode) >= 0);
  }

  if (origin) {
    freights = freights.filter(
      (freight) =>
        freight.origin.trim().toLowerCase().search(origin.toLowerCase()) >= 0
    );
  }

  if (destination) {
    freights = freights.filter(
      (freight) =>
        freight.destination
          .trim()
          .toLowerCase()
          .search(destination.toLowerCase()) >= 0
    );
  }

  if (pickup_date) {
    freights = freights.filter(
      (freight) =>
        freight.pickup_date
          .trim()
          .toLowerCase()
          .search(pickup_date.toLowerCase()) >= 0
    );
  }

  if (orderBy) {
    sortBy(orderBy);       
  }

  function sortBy(orderBy) {
    switch (orderBy) {
      case 'price':
        return freights.sort((F1, F2) => parseInt(F1.price) -parseInt(F2.price));
        break;
      case 'duration':
        return freights.sort((F1, F2) => parseInt(F1.duration) -parseInt(F2.duration));
        break;
      case 'eta':
        return freights.sort((F1, F2) => parseInt(F1.eta) -parseInt(F2.eta));
        break;
      default:
        break;
    }
  }

  if (sortOrder == 'desc') {
    freights = freights.reverse();
  }

  const initialPos = pageNumber * pageSize;

  console.log(
    `Retrieving freights page starting at position ${initialPos}, page size ${pageSize}`
  );

  const total = freights.length;

  const freightsPage = freights.slice(initialPos, initialPos + pageSize);

const final ={
  total : total,
  freights : freightsPage
} ;
  res.status(200).json(final);
}
