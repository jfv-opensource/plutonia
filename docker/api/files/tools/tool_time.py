# Pylint rules
# pylint: disable=unused-argument

"""_summary_
"""

from datetime import datetime
from zoneinfo import ZoneInfo



def signature():
    """
    Doc
    """
    return  { 'time': time }

def time(arg=None) -> str:
    """
    Return the current time in Paris

    Arguments:
      None

    Returns:
      current time (Paris)
    """

    local_timezone = ZoneInfo("Europe/Paris")
    current_time = datetime.now(local_timezone).strftime("%H:%M:%S")

    return current_time
