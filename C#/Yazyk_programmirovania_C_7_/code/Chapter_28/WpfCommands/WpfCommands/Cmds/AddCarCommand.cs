﻿using System.Collections.ObjectModel;
using System.Linq;
using WpfCommands.Models;

namespace WpfCommands.Cmds
{
    public class AddCarCommand : CommandBase
    {
        public override bool CanExecute(object parameter)
        {
            return parameter != null && parameter is ObservableCollection<Inventory>;
        }

        public override void Execute(object parameter)
        {
            if (parameter is ObservableCollection<Inventory> cars)
            {
                var maxCount = cars?.Max(x => x.CarId) ?? 0;
                cars?.Add(new Inventory { CarId = ++maxCount, Color = "Yellow", Make = "VW", PetName = "Birdie" });
            }
        }
    }
}