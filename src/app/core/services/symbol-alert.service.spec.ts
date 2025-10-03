import { TestBed } from "@angular/core/testing";

import { SymbolAlertService } from "./symbol-alert.service";

describe("SymbolAlertService", () => {
  let service: SymbolAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SymbolAlertService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
