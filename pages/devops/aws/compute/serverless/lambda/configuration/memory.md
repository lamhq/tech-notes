# Memory

## Overview

Memory can be configured between: 128 MB (default) and 10,240 MB (10 GB)

Lambda prices rise as memory increases. For example, 10 GB is 80x the price of 128 MB

More memory also means more CPU power.

The memory can be set in the **General configuration** section.


## Excution time and cost

More memory doesn't always mean it'll be more expensive, since excution time can be decreased.

It's best to try different memory configurations to compare speed and cost.

If the code is single-threaded, then allocating above 1,769 MB is unlikely to make much difference.

It's also worth comparing ARM and ×86 at different memory configurations.
