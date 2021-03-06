import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DataService } from '../../../../core/services/data-service.service';
import { QueryService } from '../../../services/query.service';
import { BehaviorSubject, merge as observableMerge, Observable, Subscription } from 'rxjs';
import { IncidentQueryDataSecureReports } from '../../../model/incident-query-data-secure-reports';
import { IncidentGraphQlquery } from '../../../graphql/incident-graph-qlquery';
import { DataSource } from '@angular/cdk/table';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-incident-list-secure-reports',
  templateUrl: './incident-list-secure-reports.component.html',
  styleUrls: ['./incident-list-secure-reports.component.css']
})
export class IncidentListSecureReportsComponent implements OnInit, OnDestroy {


  displayedColumns = ['incidentNumber', 'securityStatus', 'date', 'password', 'type', 'address', 'incidentStatus'];
  incidentQueryDatabase: SecureReportsDatabase | null;
  dataSource: SecureReportsDataSource | null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  /**
   *
   * @param {DataService} ds
   */
  constructor(private router: Router, private ds: DataService, private qs: QueryService) {
  }

  /**
   * Called when the component is created
   */
  ngOnInit() {
    this.incidentQueryDatabase = new SecureReportsDatabase(this.ds, this.qs);
    this.dataSource = new SecureReportsDataSource(this.incidentQueryDatabase, this.paginator);
  }

  /**
   * Called when the component is destroyed
   */
  ngOnDestroy() {
    this.incidentQueryDatabase.unsubscibeQuery();
  }
}

/**
 * Class that retrieves incident data from the backend - currently via a GraphQL query
 */
export class SecureReportsDatabase {

  /**
   * The session that this database shows results for
   */
  QUERY_SESSION = 'Session.OS.Query.SecureReports';  // TODO: Check that this is the correct value as defined in OnScene (if we care)

  /**
   * Subscription to the GraphQL query for incident query data
   */
  private querySub: Subscription;

  /**
   * Observable object that holds incident query data
   * @type {BehaviorSubject<IncidentQueryData[]>}
   */
  dataChange: BehaviorSubject<IncidentQueryDataSecureReports[]> = new BehaviorSubject<IncidentQueryDataSecureReports[]>([]);

  /**
   * Constructor. Sets up the GraphQL query for incident query data and subscribes to query results
   *
   * @param {DataService} ds
   */
  constructor(ds: DataService, qs: QueryService) {
    this.querySub = ds.graphQLQuery(IncidentGraphQlquery.queryIMIncidents, qs.getQueryParams(this.QUERY_SESSION)).subscribe(data => {
      const copiedData = this.data.slice();
      data['data']['incidents'].forEach(incident => {
        const listIncidentSecureReports: IncidentQueryDataSecureReports = new class implements IncidentQueryDataSecureReports {
          address: string;
          date: string;
          incidentNumber: number;
          incidentStatus: string;
          password: string;
          securityStatus: string;
          type: string;
        };

        listIncidentSecureReports.address = incident.content.response.address;
        listIncidentSecureReports.date = incident.content.response.date;
        listIncidentSecureReports.incidentNumber = incident.content.response.incidentNumber;
        listIncidentSecureReports.incidentStatus = incident.content.response.incidentStatus;
        listIncidentSecureReports.password = incident.content.response.password;
        listIncidentSecureReports.securityStatus = incident.content.response.securityStatus;
        listIncidentSecureReports.type = incident.content.response.type;
        copiedData.push(listIncidentSecureReports);
      });
      this.dataChange.next(copiedData);
    });
  }

  /**
   * Getter for the data in the Incident Query Data Observable
   *
   * @returns {IncidentData[]}
   */
  get data() {
    return this.dataChange.value;
  }

  /**
   * Unsubscribes from the IncidentQueryData subscription. It's made protected so that the component class can
   * call this method when the component is destroyed
   */
  unsubscibeQuery() {
    if (this.querySub != null) {
      this.querySub.unsubscribe();
    }
  }
}

/**
 * Data source to provide what data should be rendered in the table.
 */
export class SecureReportsDataSource extends DataSource<any> {
  
  constructor(private _incidentDatabase: SecureReportsDatabase, private _paginator: MatPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<IncidentQueryDataSecureReports[]> {
    const displayDataChanges = [
      this._incidentDatabase.dataChange,
      this._paginator.page,
    ];

    // The merge here handles observables to update table data when either new query data comes in or when the page
    // size is changed.
    return observableMerge(...displayDataChanges).pipe(
      map(() => {
        const data = this._incidentDatabase.data.slice();

        // Grab the page's slice of data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        return data.splice(startIndex, this._paginator.pageSize);
      })
    );
  }

  disconnect() {
  }
}
