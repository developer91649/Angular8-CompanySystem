import { Entity } from 'ng2-hallelujah';

export class BasicCAD extends Entity {

  public static readonly REL_NAME = 'cadIncident';

  addressLocation: string;
  addressReportingIncident: string;
  agencyCode: string;
  agencyID: string;
  alarmLevel: string;
  apartmentNumber: string;
  atPatientDateTime: string;
  callEntryDateTime: string;
  callReceivedDateTime: string;
  callSource: string;
  censusTractID: string;
  city: string;
  cityCode: string;
  clearDateTime: string;
  commandArea: string;
  dispatchDateTime: string;
  dispatcherID: string;
  dispatcherTerminalID: string;
  disposition: string;
  eMSIncidentNumber: string;
  enrouteDateTime: string;
  finalIncidentType: string;
  finalIncidentTypeDesc: string;
  fireIncidentNumber: string;
  fireManagementZone: string;
  firstDueUnitID: string;
  incidentNumber: string;
  incidentUnderControlDateTime: string;
  initialIncidentType: string;
  initialIncidentTypeDesc: string;
  latitude: string;
  locationComment: string;
  locationType: string;
  longitude: string;
  nameReportingIncident: string;
  onSceneDateTime: string;
  phoneNumberReportingIncident: string;
  policeIncidentNumber: string;
  priority: string;
  remarks1: string;
  reportingDistrict: string;
  reportNumber: string;
  serviceType: string;
  station: string;
  incidentStandard: {
    incidentNumber: string;
    exposureNumber: string;
    caseNumber: string;
    multiAgencyIncidentNumber: string;
    majorIncidentName: string;
    mutualAidFlag: string;
    relatedFireIncidentNumber: string;
    relatedEmsincidentNumber: string;
    relatedPoliceIncidentNumber: string;
    relatedSheriffIncidentNumber: string;
    highSideOfStreetNumberRange: string;
    addressNumber: string;
    streetDirectionPrefix: string;
    streetName: string;
    streetType: string;
    streetDirectionSuffix: string;
    buildingNumber: string;
    apartmentNumber: string;
    crossStreetDirectionPrefix: string;
    crossStreetName: string;
    crossStreetType: string;
    crossStreetDirectionSuffix: string;
    cityCode: string;
    city: string;
    state: string;
    county: string;
    province: string;
    region: string;
    zipCode: string;
    postalCode: string;
    country: string;
    commonPlaceName: string;
    initialCadIncidentType: string;
    finalCadIncidentType: string;
    initialAlarmLevel: string;
    finalAlarmLevel: string;
    disposition: string;
    situationFoundComment: string;
    preArrival: string;
    callReceivedDateTime: string;
    entryDateTime: string;
    dispatchDateTime: string;
    enrouteDateTime: string;
    onsceneDateTime: string;
    transportDateTime: string;
    transportCompleteDateTime: string;
    closeDateTime: string;
    secondAlarmDateTime: string;
    thirdAlarmDateTime: string;
    ambulanceRequestDateTime: string;
    ambulanceArrivalDateTime: string;
    incidentUnderControlDateTime: string;
    numberOfAmbulancesRequested: string;
    numberOfAmbulancesDispatched: string;
    alarmMethod: string;
    priority: string;
    responseLevel: string;
    firstInUnitId: string;
    firstDueUnitId: string;
    responsibleUnitId: string;
    station: string;
    battalion: string;
    division: string;
    shift: string;
    commandArea: string;
    fireManagementZone: string;
    dispatchZone: string;
    censusTractId: string;
    countyMapId: string;
    thomasBrothersMap: string;
    fireMapPage: string;
    district: string;
    hospitalId: string;
    longitude: string;
    latitude: string;
    gpslocation: string;
    highwayZone: string;
    callSource: string;
    nameReportingIncident: string;
    addressReportingIncident: string;
    phoneNumberReportingIncident: string;
    callerDescriptionComment: string;
    dispatcherId: string;
    dispatcherTerminalId: string;
    policeFireComment: string;
    administrativeComment: string;
    dispatcherNarrativeText: string;
    floor: string;
    policeBeat: string;
    relatedEmsagencyName: string;
    relatedFireAgencyName: string;
    relatedPoliceAgencyName: string;
    relatedSheriffAgencyName: string;
    xcoordinate: string;
    ycoordinate: string;
    eventIncidentNumber: string;
    density: string;
    secondDispatcherId: string;
    secondDispatcherTerminalId: string;
    addressIdentificationNumber: string;
    prePlanNumber: string;
    emddeterminantDateTime: string;
    directions: string;
  }
}
