import { NgModule } from '@angular/core';
import { DatumPipe } from './datum/datum';
import { UhrzeitPipe } from './uhrzeit/uhrzeit';
import { TerminfilterPipe } from './terminfilter/terminfilter';
import { ProbenfilterPipe } from './probenfilter/probenfilter';
@NgModule({
	declarations: [DatumPipe,
    UhrzeitPipe,
    TerminfilterPipe,
    ProbenfilterPipe],
	imports: [],
	exports: [DatumPipe,
    UhrzeitPipe,
    TerminfilterPipe,
    ProbenfilterPipe]
})
export class PipesModule {}
