import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TemperatureConverter} from './temperatureConverter.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('TemperatureConverter', () => {
  let component: TemperatureConverter;
  let fixture: ComponentFixture<TemperatureConverter>;
  let compiled: HTMLElement;
  let celsiusInput: HTMLInputElement;
  let fahrenheitInput: HTMLInputElement;

  const setInputValue = async (inputElement: HTMLInputElement, value: number) => {
    inputElement.value = value.toString();
    inputElement.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    fixture.detectChanges();
  };

  const getInputElement = (testId: string): HTMLInputElement => {
    return compiled.querySelector(`[data-test-id="${testId}"]`) as HTMLInputElement;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [TemperatureConverter],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureConverter);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    celsiusInput = getInputElement('celsius-input');
    fahrenheitInput = getInputElement('fahrenheit-input');
  });

  const testCases = [
    { celsius: 500, fahrenheit: 932 },
    { celsius: 32, fahrenheit: 89.6 },
    { fahrenheit: 932, celsius: 500 },
    { fahrenheit: 100, celsius: 37.8 }
  ];

  testCases.forEach(({ celsius, fahrenheit }) => {
    if (celsius !== undefined) {
      it(`should correctly convert ${celsius}°C to ${fahrenheit}°F`, async () => {
        await setInputValue(celsiusInput, celsius);
        expect(Number(fahrenheitInput.value)).toEqual(fahrenheit);
      });
    }
    if (fahrenheit !== undefined) {
      it(`should correctly convert ${fahrenheit}°F to ${celsius}°C`, async () => {
        await setInputValue(fahrenheitInput, fahrenheit);
        expect(Number(celsiusInput.value)).toEqual(celsius);
      });
    }
  });

  it('should perform a series of conversions correctly', async () => {
    await setInputValue(fahrenheitInput, 10);
    expect(Number(celsiusInput.value)).toEqual(-12.2);

    await setInputValue(celsiusInput, 10);
    expect(Number(fahrenheitInput.value)).toEqual(50);

    await setInputValue(fahrenheitInput, 200);
    expect(Number(celsiusInput.value)).toEqual(93.3);

    await setInputValue(celsiusInput, 248);
    expect(Number(fahrenheitInput.value)).toEqual(478.4);
  });
});
