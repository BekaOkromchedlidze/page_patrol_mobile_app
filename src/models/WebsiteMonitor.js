class WebsiteMonitorEntity {
  constructor(id, url, interval, status) {
    this.id = id;
    this.url = url;
    this.interval = interval;
    this.status = status;
  }

  static fromJson(json) {
    return new WebsiteMonitorEntity(
      json.id,
      json.url,
      json.interval,
      json.status
    );
  }
}

export default WebsiteMonitorEntity;
