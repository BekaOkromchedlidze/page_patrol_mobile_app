class PagePatrolEntity {
  constructor(id, url, interval, status) {
    this.id = id;
    this.url = url;
    this.interval = interval;
    this.status = status;
  }

  static fromJson(json) {
    return new PagePatrolEntity(json.id, json.url, json.interval, json.status);
  }
}

export default PagePatrolEntity;
