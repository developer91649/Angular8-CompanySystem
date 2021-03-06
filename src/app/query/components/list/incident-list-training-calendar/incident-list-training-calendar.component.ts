import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../core/services/data-service.service';
import { QueryService } from '../../../services/query.service';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, merge as observableMerge, Observable, Subscription } from 'rxjs';
import { IncidentQueryDataTrainingCalendar } from '../../../model/incident-query-data-training-calendar';
import { IncidentGraphQlquery } from '../../../graphql/incident-graph-qlquery';
import { DataSource } from '@angular/cdk/table';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-incident-list-training-calendar',
  templateUrl: './incident-list-training-calendar.component.html',
  styleUrls: ['./incident-list-training-calendar.component.css']
})
export class IncidentListTrainingCalendarComponent implements OnInit, OnDestroy {

  displayedColumns = ['duplicate', 'status', 'date', 'shift', 'drill', 'location', 'delete'];
  incidentQueryDatabase: TrainingCalendarDatabase | null;
  dataSource: TrainingCalendarDataSource | null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  /**
   *
   * @param {DataService} ds
   */
  constructor(private router: Router, private ds: DataService, private qs: QueryService) { }

  ngOnInit() {
    this.incidentQueryDatabase = new TrainingCalendarDatabase(this.ds, this.qs);
    this.dataSource = new TrainingCalendarDataSource(this.incidentQueryDatabase, this.paginator);
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
export class TrainingCalendarDatabase {

  /**
   * The session that this database shows results for
   */
  QUERY_SESSION = 'Session.OS.Query.TrainingCalendar';  // TODO: Check that this is the correct value as defined in OnScene (if we care)

  /**
   * Subscription to the GraphQL query for incident query data
   */
  private querySub: Subscription;

  /**
   * Observable object that holds incident query data
   * @type {BehaviorSubject<IncidentQueryData[]>}
   */
  dataChange: BehaviorSubject<IncidentQueryDataTrainingCalendar[]> = new BehaviorSubject<IncidentQueryDataTrainingCalendar[]>([]);

  /**
   * Constructor. Sets up the GraphQL query for incident query data and subscribes to query results
   *
   * @param {DataService} ds
   */
  constructor(ds: DataService, qs: QueryService) {
    this.querySub = ds.graphQLQuery(IncidentGraphQlquery.queryIMIncidents, qs.getQueryParams(this.QUERY_SESSION)).subscribe(data => {
      const copiedData = this.data.slice();
      data['data']['incidents'].forEach(incident => {
        const listIncidentTrainingCalendar: IncidentQueryDataTrainingCalendar = new class implements IncidentQueryDataTrainingCalendar {
          date: Number;
          delete: Boolean;
          drill: String;
          duplicate: String;
          location: String;
          shift: String;
          status: String;
        };
        listIncidentTrainingCalendar.date = incident.content.response.date;
        listIncidentTrainingCalendar.delete = incident.content.response.delete;
        listIncidentTrainingCalendar.drill = incident.content.response.drill;
        listIncidentTrainingCalendar.duplicate = incident.content.response.duplicate;
        listIncidentTrainingCalendar.location = incident.content.response.location;
        listIncidentTrainingCalendar.shift = incident.content.response.shift;
        listIncidentTrainingCalendar.status = incident.content.response.status;
        copiedData.push(listIncidentTrainingCalendar);
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
export class TrainingCalendarDataSource extends DataSource<any> {
  
  constructor(private _incidentDatabase: TrainingCalendarDatabase, private _paginator: MatPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<IncidentQueryDataTrainingCalendar[]> {
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
